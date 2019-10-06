/**
 * Created by stephenhamilton on 24/02/2017.
 */

import React from 'react';
import ItemAward from 'components/item/ItemAward';

const ItemAwards = ({ awards }) => {
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
                {awards.map((data, index) => {
                  return <ItemAward key={index} {...data} />;
                })}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ItemAwards;
