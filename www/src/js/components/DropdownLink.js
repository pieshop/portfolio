/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class DropdownLink extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.to !== nextProps.to;
    }

    render() {
        // console.log('DropdownLink.render',this.props.year);
        return (
            <Link to={this.props.to} class="dropdown-item date_link" data-year={this.props.year} onClick={this.props.linkClick}>{this.props.year}</Link>
        );
    }
}
