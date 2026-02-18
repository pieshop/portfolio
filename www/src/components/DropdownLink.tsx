import React, { memo } from 'react';
import { Link } from 'react-router';

interface DropdownLinkProps {
  to: string;
  year: number | string;
  linkClick: () => void;
}

const DropdownLink: React.FC<DropdownLinkProps> = memo(({ to, year, linkClick }) => {
  return (
    <Link
      to={to}
      className="dropdown-item date_link"
      data-year={year}
      onClick={linkClick}
    >
      {year}
    </Link>
  );
});

DropdownLink.displayName = 'DropdownLink';
export default DropdownLink;
