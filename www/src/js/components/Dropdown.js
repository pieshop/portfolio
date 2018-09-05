/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownLink from 'components/DropdownLink';
import * as constants from 'constants/AppConstants';

export default class Dropdown extends Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.handleDropDownLinkClick = this.handleDropDownLinkClick.bind(this);

    this.state = {
      collapsed: true,
    };
  }

  render() {
    let { category_id, year_id, yearItems } = this.props;
    const { collapsed } = this.state;
    const dropClass = collapsed ? '' : 'show';

    // console.log('Dropdown.render', category_id, year_id, yearItems);
    const year_label = year_id === constants.ALL_YEARS ? 'All Years' : year_id;

    yearItems = yearItems.map((year, i) => {
      let to = '/' + category_id + '/' + year;
      return { year: year, to: to };
    });
    return (
      <div class={'dropdown year_drop text-center ' + dropClass}>
        <button
          class="btn btn-sm btn-info dropdown-toggle"
          type="button"
          id="dropdownMenuYear"
          onClick={this.toggleHide}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {year_label}
          <span class="caret" />
        </button>
        <div class={'dropdown-menu ' + dropClass} aria-labelledby="dropdownMenuYear">
          <Link
            to={'/' + category_id + '/' + constants.ALL_YEARS}
            class="dropdown-item date_link"
            data-year={constants.ALL_YEARS}
            onClick={this.handleDropDownLinkClick}
          >
            All Years
          </Link>
          <div class="dropdown-divider" />
          {yearItems.map(this.renderItem)}
        </div>
      </div>
    );
  }

  renderItem(data) {
    return <DropdownLink key={data.year} linkClick={this.handleDropDownLinkClick} {...data} />;
  }

  handleDropDownLinkClick(e) {
    this.setState({ collapsed: true });
  }

  toggleHide() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }
}
