import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';
import Helmet from 'react-helmet/es/Helmet';

export default class Items extends Component {
  render() {
    const { selectedCategoryMetaData } = this.props;
    const { label, description } = selectedCategoryMetaData;
    return (
      <div className="main_region">
        <Helmet>
          <title>{label + ' Portfolio Items'}</title>
          <meta name="Description" content={description} />
        </Helmet>
        <ul className="list list-unstyled">
          <div className="category_region">
            <div className="row">{this.props.items.map(this.renderItem)}</div>
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
