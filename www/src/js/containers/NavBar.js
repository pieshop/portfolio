import React, {Component} from 'react';
import Dropdown from 'components/Dropdown';
import NavBarLink from 'components/NavBarLink';
import * as constants from 'constants/AppConstants';
import {connect} from 'react-redux';
import {fetchAvailableCategories} from 'store/categories/categoriesActions';
import {getFilteredState, getSelectedState, getYears} from 'store/items/itemsReducer';
import {getAvailableCategories} from 'store/categories/categoriesReducer';
import {toggleFilter} from 'store/items/itemsActions';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.renderItem              = this.renderItem.bind(this);
        this.toggleCollapse          = this.toggleCollapse.bind(this);
        this.handleNavBarClick       = this.handleNavBarClick.bind(this);
        this.handleFilterToggleClick = this.handleFilterToggleClick.bind(this);
        this.state                   = {
            collapsed: true,
        };
    }

    componentDidMount() {
        this.props.fetchAvailableCategories();
    }

    render() {
        const {availableCategories, selectedCategory, selectedYear, filtered, years} = this.props;
        const {collapsed}                                                  = this.state;
        const navClass                                                     = collapsed ? 'collapse' : '';

        // console.log('<><><><><>< NavBar.render : filtered', filtered);

        const drop_is_active = (selectedCategory !== constants.CATEGORY_ABOUT);
        const filter_text    = (filtered) ? 'ON' : 'OFF';

        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark bg-light">
                <button class="navbar-toggler navbar-toggler-right" type="button" onClick={this.toggleCollapse} data-target=".navbar-collapse" data-toggle="collapse"
                        aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={'navbar-collapse ' + navClass}>
                    <ul class="navbar-nav mr-auto">
                        {availableCategories.map(this.renderItem)}
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        {drop_is_active && <Dropdown category_id={selectedCategory} year_id={selectedYear} yearItems={years}/>}
                        {drop_is_active && <button type="button" class="btn btn-sm btn-primary navbar-btn filter"
                                                   data-toggle="tooltip" data-placement="left" title=""
                                                   onClick={this.handleFilterToggleClick}
                                                   data-original-title="Toggle between filtered/unfiltered projects">{filter_text}</button>}
                    </form>
                </div>
            </nav>
        );
    }

    renderItem(data) {
        // console.log('NavBar.renderItem', data);
        return <NavBarLink
            key={data.category_name}
            linkClick={this.handleNavBarClick}
            selectedYear={this.props.selectedYear}
            {...data}
        />;
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed: collapsed});
    }

    hasClass(element, clazz) {
        return (' ' + element.className + ' ').indexOf(' ' + clazz + ' ') > -1;
    }

    handleFilterToggleClick(e) {
        // const {selectedCategory, selectedYear} = this.props;
        // console.log('NavBar.handleFilterToggleClick', selectedCategory, selectedYear);
        // NavActions.toggleFilter();
        // const is_filtered = CategoryStore.getIsFiltered();
        // NavActions.fetchCategoryItems({category_id: selectedCategory, year_id: selectedYear, is_filtered: is_filtered});
        this.props.toggleFilter();
        this.toggleCollapse();
    }

    handleNavBarClick(e) {
        if (this.hasClass(e.currentTarget, 'disabled')) {
            /*
             *  Cancel click if button has disabled class
             */
            e.preventDefault();
            return;
        }
        const {selectedCategory} = this.props;
        if (selectedCategory === constants.DEFAULT_CATEGORY) {
            // NavActions.reset();
        }
        this.toggleCollapse();
    }
}

function mapStateToProps(state) {
    const {selectedCategory, selectedYear} = getSelectedState(state);
    return {
        selectedCategory,
        selectedYear,
        filtered:getFilteredState(state),
        years:getYears(state),
        availableCategories:getAvailableCategories(state),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        toggleFilter: () => {
            dispatch(toggleFilter());
        },
        fetchAvailableCategories: () => {
            dispatch(fetchAvailableCategories());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
