import React from 'react';
import { DropdownMenu, Button } from '@radix-ui/themes';
import { Link } from 'react-router';
import * as constants from 'constants/AppConstants';

interface DropdownProps {
  category_id: string;
  year_id: string;
  yearItems: number[];
}

const Dropdown: React.FC<DropdownProps> = ({ category_id, year_id, yearItems }) => {
  const year_label = year_id === constants.ALL_YEARS ? 'All Years' : year_id;

  const yearLinks = yearItems.map((year) => ({
    year,
    to: '/' + category_id + '/' + year,
  }));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" color="cyan" variant="solid">
          {year_label} <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="center">
        <DropdownMenu.Item asChild>
          <Link to={'/' + category_id + '/' + constants.ALL_YEARS}>All Years</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        {yearLinks.map((data) => (
          <DropdownMenu.Item key={data.year} asChild>
            <Link to={data.to}>{data.year}</Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
