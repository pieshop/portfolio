import React from 'react';
import ItemAward from 'components/item/ItemAward';

interface ItemAwardsProps {
  awards: Array<Record<string, unknown>>;
}

const ItemAwards: React.FC<ItemAwardsProps> = ({ awards }) => {
  return (
    <div className="item__awards">
      <div className="card mb-3">
        <div className="card-body block-header">
          <h3 className="card-title">Awards</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <div className="card-deck w-100">
                {awards.map((data, index) => (
                  <ItemAward
                    key={index}
                    award_name={data.award_name as string}
                    award_long_name={data.award_long_name as string}
                    award_result={data.award_result as string}
                    award_category={data.award_category as string}
                    link={(data.link as string) || ''}
                    pdf={(data.pdf as string) || ''}
                    hasLink={Boolean(data.hasLink)}
                    hasAwardCategory={Boolean(data.hasAwardCategory)}
                  />
                ))}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ItemAwards;
