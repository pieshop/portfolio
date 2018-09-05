import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchItemsIfNeeded,
  invalidateCategory,
  selectCategory,
  selectYear,
} from 'store/items/itemsActions';
import { getItems, getSelectedState } from 'store/items/itemsReducer';
import Items from 'components/Items';
import { getSelectedCategoryMetaData } from 'store/categories/categoriesReducer';

class Categories extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { params } = this.props.match;
    const { category_id, year_id } = params;
    // console.log('** Categories.componentDidMount', category_id, year_id);
    this.props.selectCategory(category_id);
    this.props.selectYear(year_id);
    this.props.fetchItemsIfNeeded(category_id, year_id);
  }

  componentWillReceiveProps(nextProps) {
    const { category_id, year_id } = this.props.match.params;
    const { category_id: next_category_id, year_id: next_year_id } = nextProps.match.params;
    if (category_id !== next_category_id) {
      // console.log('** Categories.componentWillReceiveProps', category_id, next_category_id);
      this.props.selectCategory(next_category_id);
    }
    if (year_id !== next_year_id) {
      // console.log('** Categories.componentWillReceiveProps', year_id, next_year_id);
      this.props.selectYear(next_year_id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      // console.log('** Categories.componentDidUpdate');
      const { selectedCategory, selectedYear } = this.props;
      this.props.fetchItemsIfNeeded(selectedCategory, selectedYear);
    }
  }

  render() {
    const { items, selectedCategoryMetaData } = this.props;
    return <Items items={items} selectedCategoryMetaData={selectedCategoryMetaData} />;
  }
}

Categories.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  // dispatch        : PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { selectedCategory, selectedYear } = getSelectedState(state);
  return {
    selectedCategory,
    selectedYear,
    items: getItems(state),
    selectedCategoryMetaData: getSelectedCategoryMetaData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category_id) => {
      dispatch(selectCategory(category_id));
    },
    selectYear: (year_id) => {
      dispatch(selectYear(year_id));
    },
    fetchItemsIfNeeded: (category_id, year_id) => {
      dispatch(fetchItemsIfNeeded(category_id, year_id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
