import React from 'react';
import { Link, useLocation } from 'react-router';

interface NavBarLinkProps {
  is_active?: boolean;
  category_name: string;
  category_label: string;
  linkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  to: string;
  selectedYear: string;
}

const NavBarLink: React.FC<NavBarLinkProps> = ({
  is_active,
  category_name,
  category_label,
  linkClick,
  to,
  selectedYear,
}) => {
  const location = useLocation();
  const goto = to.indexOf('{year}') !== -1 ? to.replace('{year}', selectedYear) : to;
  const clz = is_active ? '' : 'disabled';
  const isActivePath = location.pathname.split('/')[1] === category_name;

  return (
    <li className="nav-item">
      <Link
        to={goto}
        className={`nav-link ${clz}${isActivePath ? ' active' : ''}`}
        data-id={category_name}
        onClick={linkClick}
      >
        {category_label}
      </Link>
    </li>
  );
};

export default NavBarLink;
