import React, { useState, useEffect } from 'react';
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

  const navClass = collapsed ? 'collapse' : '';
  const drop_is_active = selectedCategory !== constants.CATEGORY_ABOUT;
  const filter_text = isFiltered ? 'ON' : 'OFF';

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-light">
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        onClick={toggleCollapse}
        aria-controls="navbar-collapse"
        aria-expanded={!collapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className={'navbar-collapse ' + navClass}>
        <ul className="navbar-nav mr-auto">
          {availableCategories.map((o) => (
            <NavBarLink
              key={o.category_name}
              linkClick={handleNavBarClick}
              selectedYear={selectedYear}
              is_active={o.is_active}
              category_name={o.category_name}
              category_label={o.category_label}
              to={(o.to as string) || '/' + o.category_name}
            />
          ))}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {drop_is_active && (
            <Dropdown category_id={selectedCategory} year_id={selectedYear} yearItems={years} />
          )}
          {drop_is_active && (
            <button
              type="button"
              className="btn btn-sm btn-primary navbar-btn filter"
              onClick={handleFilterToggleClick}
              title="Toggle between filtered/unfiltered projects"
            >
              {filter_text}
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
