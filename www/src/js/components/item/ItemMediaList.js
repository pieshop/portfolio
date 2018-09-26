/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import ItemPDF from 'components/item/ItemPDF';
import ItemSWF from 'components/item/ItemSWF';
import * as fileTypes from 'utils/fileTypes';
import LazyLoad from 'react-lazyload';
import ItemImagePlaceholder from './ItemImagePlaceholder';
import ItemImageDesktop from './ItemImageDesktop';
import ItemImageOLM from './ItemImageOLM';
import ItemImageSmartphone from 'components/item/ItemImageSmartphone';
import ItemVIDEO from 'components/item/ItemVIDEO';

export default class ItemMediaList extends Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    const { mediaItems = [] } = this.props;
    const { images = {}, pdfs = [], swfs = [], videos = [] } = mediaItems;
    // console.log('ItemMediaList', images, pdfs, swfs);
    return (
      <div class="item__media">
        {images && <div class="row">{this.renderImages(images)}</div>}
        {pdfs.length > 0 && <div class="row">{pdfs.map(this.renderItem)}</div>}
        {swfs.length > 0 && <div class="row">{swfs.map(this.renderItem)}</div>}
        {videos.length > 0 && <div class="row">{videos.map(this.renderItem)}</div>}
      </div>
    );
  }

  renderImages(images) {
    const { desktop = [], olm = [], smartphone = [] } = images;
    const fragment = (
      <React.Fragment>
        {desktop.map(this.renderItem)}
        {olm.map(this.renderItem)}
        {smartphone.map(this.renderItem)}
      </React.Fragment>
    );
    return fragment;
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
      case fileTypes.MEDIA_VIDEO:
        fragment = <ItemVIDEO key={data.id} style={style} {...data} />;
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
    if (image_type === fileTypes.IMAGE_OLM) {
      styl = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center';
    }
    if (image_type === fileTypes.IMAGE_SMARTPHONE) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center';
    }
    if (is_single_item) {
      styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
    }
    return styl;
  }
}
