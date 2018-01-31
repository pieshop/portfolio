import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchItemIfNeeded, selectItem} from 'store/item/itemActions';
import {getItemData} from 'store/item/itemReducer';
import ItemOverview from 'components/item/ItemOverview';
import ItemDetails from 'components/item/ItemDetails';
import ItemAwards from 'components/item/ItemAwards';
import ItemMediaList from 'components/item/ItemMediaList';
import ArchiveItemMediaList from 'components/item/ArchiveItemMediaList';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        TweenMax.to(this.item_ref, 0.3, {opacity: 1, ease: Power1.easeIn});
        const {params}                           = this.props.match;
        const {category_id, client_id, entry_id} = params;
        // console.log('** Item.componentDidMount', category_id, client_id, entry_id);
        this.props.selectItem(entry_id);
        this.props.fetchItemIfNeeded(entry_id, client_id);
    }

    render() {
        const opacity                           = {opacity: 0};
        const {itemData, archiveItemData}       = this.props;
        const {has_awards, awards, media_items} = itemData;
        const is_archive                        = this.props.location.pathname.indexOf('/archive') > 0;
        const linkTo                            = (is_archive) ? this.props.match.url : this.props.match.url + '/archive';
        return (
            <div class="main_region">
                <div class="item" ref={(item) => this.item_ref = item } style={opacity}>
                    <ItemOverview {...itemData} is_archive={is_archive} linkTo={linkTo}/>
                    {!is_archive &&
                    <ItemDetails {...itemData}/>
                    }
                    {!is_archive && has_awards &&
                    <ItemAwards awards={awards}/>
                    }
                    {!is_archive ? (
                        <ItemMediaList mediaItems={media_items}/>
                    ) : (
                        <ArchiveItemMediaList mediaItems={archiveItemData}/>
                    )}
                </div>
            </div>
        );

    }
}

Item.propTypes = {
    itemData: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {itemData, archiveItemData} = getItemData(state);
    return {
        itemData,
        archiveItemData,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        selectItem: (entry_id) => {
            dispatch(selectItem(entry_id));
        },
        fetchItemIfNeeded: (entry_id, client_id) => {
            dispatch(fetchItemIfNeeded(entry_id, client_id));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
