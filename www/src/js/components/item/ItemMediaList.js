/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import ItemPDF from 'components/item/ItemPDF';
import ItemSWF from 'components/item/ItemSWF';
import * as constants from 'constants/AppConstants';
import * as fileTypes from 'utils/fileTypes';
import LazyLoad from 'react-lazyload';
import ItemImagePlaceholder from './ItemImagePlaceholder';
import ItemImageDesktop from './ItemImageDesktop';
import ItemImageOLM from './ItemImageOLM';
import ItemImageSmartphone from 'components/item/ItemImageSmartphone';

export default class ItemMediaList extends Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    let { mediaItems = [] } = this.props;
    return (
      <div class="item__media">
        <div class="row">{mediaItems.map(this.renderItem)}</div>
      </div>
    );
  }

  renderItems() {
    let { mediaItems = [] } = this.props;
    mediaItems.map(this.renderItem);
    // console.log('ItemMediaList.renderItem', data);
  }

  renderItem(data) {
    // console.log('ItemMediaList.renderItem', data);
    return this.getMedia(data, this.getStyle(data.media_info));
  }

  getMedia(data, style) {
    let fragment = null;
    const { media_type, media_info } = data;
    const { width = 500, height = 500 } = media_info;
    switch (media_type) {
      case fileTypes.MEDIA_IMAGE: {
        const { id } = data;
        const img = this.getImage(data, style);
        fragment = (
          <LazyLoad
            key={id}
            height={height}
            placeholder={<ItemImagePlaceholder style={style} width={width} height={height} />}
            debounce={300}
            once
          >
            {img}
          </LazyLoad>
        );
        return fragment;
      }
      case fileTypes.MEDIA_PDF:
        fragment = <ItemPDF key={data.id} style={style} {...data} />;
        break;
      case fileTypes.MEDIA_SWF:
        fragment = <ItemSWF key={data.id} style={style} {...data} />;
        break;
      default:
    }
    return fragment;
  }

  getImage(data, style) {
    let fragment = null;
    switch (data.media_info.image_type) {
      case fileTypes.IMAGE_DESKTOP:
        fragment = <ItemImageDesktop key={data.id} style={style} {...data} />;
        break;
      case fileTypes.IMAGE_SMARTPHONE:
        fragment = <ItemImageSmartphone key={data.id} style={style} {...data} />;
        break;
      case fileTypes.IMAGE_OLM:
        fragment = <ItemImageOLM key={data.id} style={style} {...data} />;
        break;
    }
    return fragment;
  }

  getStyle(data) {
    const { image_type, is_single_item } = data;
    let styl = '';
    if (image_type === fileTypes.IMAGE_DESKTOP) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 text-center';
    }
    if (is_single_item) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
    }
    if (image_type === fileTypes.IMAGE_OLM) {
      styl = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center';
    }
    if (image_type === fileTypes.IMAGE_SMARTPHONE) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center';
    }
    return styl;
  }
}
