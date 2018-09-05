/**
 * Created by stephenhamilton on 24/02/2017.
 */

import React from 'react';
import ItemAward from 'components/item/ItemAward';

const ItemAwards = ({ awards }) => {
  return (
    <div class="item__awards">
      <div class="card mb-3">
        <div class="card-body block-header">
          <h3 class="card-title">Awards</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="card-deck w-100">
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
