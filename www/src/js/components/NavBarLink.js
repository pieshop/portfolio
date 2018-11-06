/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBarLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      is_active = false,
      category_name,
      category_label,
      linkClick,
      to,
      selectedYear,
    } = this.props;
    // console.log('NavBarLink', category_name, is_active);
    const goto = to.indexOf('{year}') !== -1 ? to.replace('{year}', selectedYear) : to;
    const clz = is_active ? '' : 'disabled';
    return (
      <li class="nav-item">
        <NavLink
          to={goto}
          isActive={(match, location) =>
            location.pathname.split('/')[1] === this.props.category_name
          }
          exact={false}
          // activeStyle={{ color: 'red' }}
          activeClassName="active"
          class={'nav-link ' + clz}
          data-id={category_name}
          onClick={linkClick}
        >
          {category_label}
        </NavLink>
      </li>
    );
  }
}
