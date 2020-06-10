import React, { Component } from 'react';
import Dropdown from 'components/Dropdown';
import NavBarLink from 'components/NavBarLink';
import * as constants from 'constants/AppConstants';
import { connect } from 'react-redux';
import { fetchAvailableCategories } from 'store/categories/categoriesActions';
import { getYears } from 'store/items/itemsSelectors';
import {
  getAvailableCategories,
  getFilteredState,
  getSelectedYear,
  getSelectedCategory,
} from 'store/categories/categoriesSelectors';
import { toggleFilter } from 'store/categories/categoriesActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleNavBarClick = this.handleNavBarClick.bind(this);
    this.handleFilterToggleClick = this.handleFilterToggleClick.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  componentDidMount() {
    this.props.fetchAvailableCategories();
  }

  render() {
    const { selectedCategory, selectedYear, filtered, years } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? 'collapse' : '';

    // console.log('<><><><><>< NavBar.render : filtered', filtered);
    // console.log('<><><><><>< NavBar.render : availableCategories', availableCategories);
    // console.log('<><><><><>< NavBar.render : this.props', this.props);

    const drop_is_active = selectedCategory !== constants.CATEGORY_ABOUT;
    const filter_text = filtered ? 'ON' : 'OFF';

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-light">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={this.toggleCollapse}
          data-target=".navbar-collapse"
          data-toggle="collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={'navbar-collapse ' + navClass}>
          <ul className="navbar-nav mr-auto">{this.renderItems()}</ul>
          <form className="form-inline my-2 my-lg-0">
            {drop_is_active && (
              <Dropdown category_id={selectedCategory} year_id={selectedYear} yearItems={years} />
            )}
            {drop_is_active && (
              <button
                type="button"
                className="btn btn-sm btn-primary navbar-btn filter"
                data-toggle="tooltip"
                data-placement="left"
                title=""
                onClick={this.handleFilterToggleClick}
                data-original-title="Toggle between filtered/unfiltered projects"
              >
                {filter_text}
              </button>
            )}
          </form>
        </div>
      </nav>
    );
  }

  renderItems() {
    const { availableCategories, selectedCategory } = this.props;
    return availableCategories.map((o, i) => {
      return this.renderItem(o, selectedCategory);
    });
  }

  renderItem(data, selectedCategory) {
    // console.log('<><><><><>< NavBar.renderItem : data', data, 'selectedCategory', selectedCategory);
    return (
      <NavBarLink
        key={data.category_name}
        linkClick={this.handleNavBarClick}
        selectedYear={this.props.selectedYear}
        {...data}
      />
    );
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed: collapsed });
  }

  hasClass(element, clazz) {
    return (' ' + element.className + ' ').indexOf(' ' + clazz + ' ') > -1;
  }

  handleFilterToggleClick(e) {
    this.props.toggleFilter();
    this.toggleCollapse();
  }

  handleNavBarClick(e) {
    if (this.hasClass(e.currentTarget, 'disabled')) {
      /* Cancel click if button has disabled class */
      e.preventDefault();
      return;
    }
    const { selectedCategory } = this.props;
    // if (selectedCategory === constants.DEFAULT_CATEGORY) {
    // NavActions.reset();
    // }
    this.toggleCollapse();
  }
}

const mapStateToProps = (state) => {
  // const { selectedCategory, selectedYear } = getSelectedState(state);
  return {
    selectedCategory: getSelectedCategory(state),
    selectedYear: getSelectedYear(state),
    filtered: getFilteredState(state),
    years: getYears(state),
    availableCategories: getAvailableCategories(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilter: () => {
      dispatch(toggleFilter());
    },
    fetchAvailableCategories: () => {
      dispatch(fetchAvailableCategories());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
