import React from 'react';
import { Helmet } from 'react-helmet-async';
import CategoryItem from 'components/CategoryItem';

interface CategoryMetaData {
  label: string;
  description: string;
}

interface ItemsProps {
  items: Array<Record<string, unknown>>;
  selectedCategoryMetaData: CategoryMetaData;
}

const Items: React.FC<ItemsProps> = ({ items, selectedCategoryMetaData }) => {
  const { label, description } = selectedCategoryMetaData;
  return (
    <div className="main_region">
      <Helmet>
        <title>{label + ' Portfolio Items'}</title>
        <meta name="Description" content={description} />
      </Helmet>
      <ul className="list list-unstyled">
        <div className="category_region">
          <div className="row">
            {items.map((data, index) => (
              <CategoryItem
                key={data.id as string}
                id={data.id as string}
                title={data.title as string}
                to={data.to as string}
                client_label={data.client_label as string}
                entry_id={data.entry_id as string}
                client_id={data.client_id as string}
                year={data.year as number}
                thumb_path={data.thumb_path as string}
                is_responsive={data.is_responsive as boolean}
                awards={data.awards as Array<{ id: string; award_long_name: string; award_result: string }>}
                index={index}
              />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Items;
