import React, { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Button, Flex } from '@radix-ui/themes';
import Dropdown from 'components/Dropdown';
import NavBarLink from 'components/NavBarLink';
import * as constants from 'constants/AppConstants';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchAvailableCategories, toggleFilter } from 'store/categories/categoriesActions';
import { getYears } from 'store/items/itemsSelectors';
import {
  getAvailableCategories,
  getFilteredState,
  getSelectedYear,
  getSelectedCategory,
} from 'store/categories/categoriesSelectors';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(getSelectedCategory);
  const selectedYear = useAppSelector(getSelectedYear);
  const isFiltered = useAppSelector(getFilteredState);
  const years = useAppSelector(getYears);
  const availableCategories = useAppSelector(getAvailableCategories);

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    dispatch(fetchAvailableCategories() as unknown as { type: string });
  }, [dispatch]);

  const toggleCollapse = () => setCollapsed((c) => !c);

  const handleNavBarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    if ((' ' + target.className + ' ').indexOf(' disabled ') > -1) {
      e.preventDefault();
      return;
    }
    toggleCollapse();
  };

  const handleFilterToggleClick = () => {
    dispatch(toggleFilter() as unknown as { type: string });
    toggleCollapse();
  };

  const drop_is_active = selectedCategory !== constants.CATEGORY_ABOUT;
  const filter_text = isFiltered ? 'ON' : 'OFF';

  return (
    <nav className="site-nav">
      <button
        className="site-nav__toggler"
        type="button"
        onClick={toggleCollapse}
        aria-controls="site-nav-collapse"
        aria-expanded={!collapsed}
        aria-label="Toggle navigation"
      >
        <span className="site-nav__toggler-icon" />
      </button>

      <div id="site-nav-collapse" className={'site-nav__collapse' + (collapsed ? '' : ' is-open')}>
        <NavigationMenu.Root className="site-nav__menu">
          <NavigationMenu.List className="site-nav__list">
            {availableCategories.map((o) => (
              <NavigationMenu.Item key={o.category_name}>
                <NavBarLink
                  linkClick={handleNavBarClick}
                  selectedYear={selectedYear}
                  is_active={o.is_active}
                  category_name={o.category_name}
                  category_label={o.category_label}
                  to={(o.to as string) || '/' + o.category_name}
                />
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Flex align="center" gap="2">
          {drop_is_active && (
            <div className="year_drop">
              <Dropdown category_id={selectedCategory} year_id={selectedYear} yearItems={years} />
            </div>
          )}
          {drop_is_active && (
            <Button
              size="1"
              color="blue"
              variant="solid"
              onClick={handleFilterToggleClick}
              title="Toggle between filtered/unfiltered projects"
            >
              {filter_text}
            </Button>
          )}
        </Flex>
      </div>
    </nav>
  );
};

export default NavBar;
