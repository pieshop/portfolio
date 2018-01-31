import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';

export default class Items extends Component {
    render() {
        return (
            <div class="main_region">
                <ul class="list list-unstyled">
                    <div class="category_region">
                        <div class="row">
                            {this.props.items.map(this.renderItem)}
                        </div>
                    </div>
                </ul>
            </div>
        );
    }

    renderItem(data, index) {
        return <CategoryItem
            key={data.id}
            {...data}
            index={index}
        />;
    }
}

Items.propTypes = {
    items: PropTypes.array.isRequired
};
