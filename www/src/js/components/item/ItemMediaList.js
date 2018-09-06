/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import ItemPDF from 'components/item/ItemPDF';
import ItemSWF from 'components/item/ItemSWF';
import * as constants from 'constants/AppConstants';
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
    let { mediaItems } = this.props;
    mediaItems = mediaItems || [];
    return (
      <div class="item__media">
        <div class="row">{mediaItems.map(this.renderItem)}</div>
      </div>
    );
  }

  renderItem(data) {
    console.log('ItemMediaList.renderItem', data);
    return this.getMedia(data, this.getStyle(data));
  }

  getMedia(data, style) {
    let fragment = null;
    switch (data.media_type) {
      case constants.IMAGE: {
        const { width = 500, height = 500 } = data;
        const img = this.getImage(data, style);
        fragment = (
          <LazyLoad
            key={data.id}
            height={height}
            placeholder={
              <ItemImagePlaceholder
                is_responsive={data.is_desktop}
                style={style}
                width={width}
                height={height}
              />
            }
            debounce={300}
            once
          >
            {img}
          </LazyLoad>
        );
        return fragment;
      }
      case constants.PDF:
        fragment = <ItemPDF key={data.id} style={style} {...data} />;
        break;
      case constants.SWF:
        fragment = <ItemSWF key={data.id} style={style} {...data} />;
        break;
      default:
    }
    return fragment;
  }

  getImage(data, style) {
    let fragment = null;
    switch (data.image_type) {
      case constants.IMAGE_DESKTOP:
        fragment = <ItemImageDesktop key={data.id} style={style} {...data} />;
        break;
      case constants.IMAGE_SMARTPHONE:
        fragment = <ItemImageSmartphone key={data.id} style={style} {...data} />;
        break;
      case constants.IMAGE_OLM:
        fragment = <ItemImageOLM key={data.id} style={style} {...data} />;
        break;
    }
    return fragment;
  }

  getStyle(data) {
    const { is_desktop, is_olm, is_smartphone, is_single_item } = data;
    let styl = '';
    if (is_desktop) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 text-center';
    }
    if (is_single_item) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
    }
    if (is_olm) {
      styl = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center';
    }
    if (is_smartphone) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center';
    }
    return styl;
  }
}
