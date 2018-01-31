/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';

const CategoryItemAward = (props) => {
    const title = props.award_long_name + ' ' + props.award_result;
    return (
        <span class="icon-star" data-toggle="tooltip" data-placement="top" title={title}></span>
    );
};
export default CategoryItemAward;
