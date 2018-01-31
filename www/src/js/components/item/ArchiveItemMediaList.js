/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';
import ArchiveItemIframe from 'components/item/ArchiveItemIframe';
import ArchiveItemSWF from 'components/item/ArchiveItemSWF';
import * as constants from 'constants/AppConstants';

export default class ArchiveItemMediaList extends Component {
    constructor() {
        super();
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        let {mediaItems} = this.props;
        mediaItems       = mediaItems || [];

        // console.log('ArchiveItemMediaList.render', mediaItems);

        return (
            <ul class="item__media">
                {mediaItems.map(this.renderItem)}
            </ul>
        );
    }

    // getStyle(data) {
    //     const {
    //               is_desktop,
    //               is_olm,
    //               is_smartphone,
    //               is_single_item
    //           }  = data;
    //     let styl = '';
    //     if (is_desktop) {
    //         styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 text-center';
    //     }
    //     if (is_single_item) {
    //         styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
    //     }
    //     if (is_olm) {
    //         styl = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center';
    //     }
    //     if (is_smartphone) {
    //         styl = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center';
    //     }
    //     return styl;
    // }

    renderItem(data) {
        // const style  = this.getStyle(data);
        let fragment = null;
        switch (data.media_type) {
            case constants.IFRAME:
                fragment = <ArchiveItemIframe key={data.id} {...data} />;
                break;
            case constants.SWF:
                fragment = <ArchiveItemSWF key={data.id} {...data} />;
                break;
            default:
        }
        return fragment;
    }
}
