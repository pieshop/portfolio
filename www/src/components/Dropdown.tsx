import React, { useState } from 'react';
import { Link } from 'react-router';
import DropdownLink from 'components/DropdownLink';
import * as constants from 'constants/AppConstants';

interface DropdownProps {
  category_id: string;
  year_id: string;
  yearItems: number[];
}

const Dropdown: React.FC<DropdownProps> = ({ category_id, year_id, yearItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  const dropClass = collapsed ? '' : 'show';
  const year_label = year_id === constants.ALL_YEARS ? 'All Years' : year_id;

  const yearLinks = yearItems.map((year) => ({
    year,
    to: '/' + category_id + '/' + year,
  }));

  const handleDropDownLinkClick = () => setCollapsed(true);
  const toggleHide = () => setCollapsed((c) => !c);

  return (
    <div className={'dropdown year_drop text-center ' + dropClass}>
      <button
        className="btn btn-sm btn-info dropdown-toggle"
        type="button"
        id="dropdownMenuYear"
        onClick={toggleHide}
        aria-haspopup="true"
        aria-expanded={!collapsed}
      >
        {year_label}
        <span className="caret" />
      </button>
      <div className={'dropdown-menu ' + dropClass} aria-labelledby="dropdownMenuYear">
        <Link
          to={'/' + category_id + '/' + constants.ALL_YEARS}
          className="dropdown-item date_link"
          data-year={constants.ALL_YEARS}
          onClick={handleDropDownLinkClick}
        >
          All Years
        </Link>
        <div className="dropdown-divider" />
        {yearLinks.map((data) => (
          <DropdownLink key={data.year} linkClick={handleDropDownLinkClick} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
