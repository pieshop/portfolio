/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';
import ItemImage from 'components/item/ItemImage';
import ItemPDF from 'components/item/ItemPDF';
import ItemSWF from 'components/item/ItemSWF';
import * as constants from 'constants/AppConstants';

export default class ItemMediaList extends Component {
    constructor() {
        super();
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        let {mediaItems} = this.props;
        mediaItems       = mediaItems || [];

        // console.log('ItemMediaList.render', mediaItems);

        return (
            <div class="item__media">
                <div class="row">
                    {mediaItems.map(this.renderItem)}
                </div>
            </div>
        );
    }

    renderItem(data) {
        const style  = this.getStyle(data);
        // console.log('ItemMediaList.renderItem', style);
        let fragment = null;
        switch (data.media_type) {
            case constants.IMAGE :
                fragment = <ItemImage key={data.id} style={style} {...data} />;
                break;
            case constants.PDF :
                fragment = <ItemPDF key={data.id} style={style} {...data} />;
                break;
            case constants.SWF :
                fragment = <ItemSWF key={data.id} style={style} {...data} />;
                break;
            default:
        }
        return fragment;
    }

    getStyle(data) {
        const {
                  is_desktop,
                  is_olm,
                  is_smartphone,
                  is_single_item
              }  = data;
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
