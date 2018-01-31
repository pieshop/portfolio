/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class NavBarLink extends Component {

    constructor(props) {
        super(props);
        this.checkActive = this.checkActive.bind(this);
    }

    render() {
        const to = (this.props.to.indexOf('{year}')!== -1) ? this.props.to.replace('{year}', this.props.selectedYear) : this.props.to;
        const clz = this.props.is_active ? '' : 'disabled';
        return (
            <li class="nav-item" >
                <NavLink to={to} isActive={this.checkActive} exact={false} activeClassName="active" class={'nav-link ' + clz} data-id={this.props.category_name}
                         onClick={this.props.linkClick}>{this.props.category_label}</NavLink>
            </li>
        );
    }

    checkActive(match, location) {
        const cat = location.pathname.split('/')[1];
        // console.log('checkActive', match, location, this.props.category_name, cat);
        return cat === this.props.category_name;
    }
}
