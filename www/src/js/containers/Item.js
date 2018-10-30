import { TweenLite } from 'gsap/TweenLite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectItem } from 'store/item/itemActions';
import { getItemData } from 'store/item/itemSelectors';
import ItemOverview from 'components/item/ItemOverview';
import ItemDetails from 'components/item/ItemDetails';
import ItemAwards from 'components/item/ItemAwards';
import ItemMediaList from 'components/item/ItemMediaList';
import ArchiveItemMediaList from 'components/item/ArchiveItemMediaList';
import Helmet from 'react-helmet/es/Helmet';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    TweenLite.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
    const { params } = this.props.match;
    const { category_id, client_id, entry_id } = params;
    // console.log('** Item.componentDidMount', category_id, client_id, entry_id);
    this.props.selectItem({ client_id, entry_id });
  }

  render() {
    const opacity = { opacity: 0 };
    const { itemData, archiveItemData } = this.props;
    const { has_awards, awards, media_items } = itemData;
    const is_archive = this.props.location.pathname.indexOf('/archive') > 0;
    const linkTo = is_archive ? this.props.match.url : this.props.match.url + '/archive';
    const { title, client_label, description } = this.props.itemData;
    return (
      <div class="main_region">
        <Helmet>
          <title>{client_label + ' : ' + title}</title>
          <description>{description}</description>
          <meta name="Description" content={description} />
        </Helmet>
        <div class="item" ref={(item) => (this.item_ref = item)} style={opacity}>
          <ItemOverview {...itemData} is_archive={is_archive} linkTo={linkTo} />
          {!is_archive && <ItemDetails {...itemData} />}
          {!is_archive && has_awards && <ItemAwards awards={awards} />}
          {!is_archive ? (
            <ItemMediaList mediaItems={media_items} />
          ) : (
            <ArchiveItemMediaList mediaItems={archiveItemData} />
          )}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  itemData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { itemData, archiveItemData } = getItemData(state);
  return {
    itemData,
    archiveItemData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectItem: (opts) => {
      dispatch(selectItem(opts));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
