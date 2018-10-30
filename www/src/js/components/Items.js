import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';
import Helmet from 'react-helmet/es/Helmet';

export default class Items extends Component {
  render() {
    const { selectedCategoryMetaData } = this.props;
    const { label, description } = selectedCategoryMetaData;
    return (
      <div class="main_region">
        <Helmet>
          <title>{label + ' Portfolio Items'}</title>
          <description>{description}</description>
          <meta name="Description" content={description} />
        </Helmet>
        <ul class="list list-unstyled">
          <div class="category_region">
            <div class="row">{this.props.items.map(this.renderItem)}</div>
          </div>
        </ul>
      </div>
    );
  }

  renderItem(data, index) {
    // console.log('renderItem', data);
    return <CategoryItem key={data.id} {...data} index={index} />;
  }
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
};
