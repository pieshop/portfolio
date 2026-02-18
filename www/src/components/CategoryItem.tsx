import React from 'react';
import { Link } from 'react-router';
import CategoryItemAward from 'components/CategoryItemAward';
import CategoryItemImage from 'components/CategoryItemImage';

interface Award {
  id: string;
  award_long_name: string;
  award_result: string;
}

interface CategoryItemProps {
  id: string;
  title: string;
  to: string;
  client_label: string;
  entry_id: string;
  client_id: string;
  year: number;
  thumb_path: string;
  is_responsive?: boolean;
  awards?: Award[];
  index?: number;
  [key: string]: unknown;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  id,
  title,
  to,
  client_label,
  entry_id,
  client_id,
  year,
  thumb_path,
  is_responsive,
  awards,
}) => {
  return (
    <div className="item__container col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <li className="list__item--subtle_shadow">
        <article id={id}>
          <Link
            to={to}
            className="item__thumbnail"
            data-entryid={entry_id}
            data-clientid={client_id}
            title={title}
          >
            <CategoryItemImage title={title} thumb_path={thumb_path} is_responsive={is_responsive} />
          </Link>

          <div className="item__decoration text-center">
            <div className="decoration decoration__left" />
            <div className="decoration decoration__right" />
          </div>

          <div className="item__caption text-center">
            <dl className="dl-vertical">
              <dt className="project-title">{title}</dt>
              <dd className="client">{client_label}</dd>
              <dd className="year">
                {year}
                {awards && (
                  <span className="item__awards">
                    {awards.map((data, index) => (
                      <CategoryItemAward key={data.id || index} {...data} />
                    ))}
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </article>
      </li>
      <div className="entry-spacer" />
    </div>
  );
};

export default CategoryItem;
