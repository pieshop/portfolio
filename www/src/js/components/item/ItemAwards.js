/**
 * Created by stephenhamilton on 24/02/2017.
 */

import React from 'react';
import ItemAward from 'components/item/ItemAward';

const ItemAwards = ({awards}) => {
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
                                    return (
                                        <ItemAward key={index} {...data} />
                                    );
                                })}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="modal fade" id="awardModal" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Title</h4>
                        </div>
                        <div class="modal-body">
                            <h3>Body</h3>
                            <div id="pdf">
                                <object width="100%" height="400" type="application/pdf" data="" id="pdf_content">
                                    <p>PDF cannot be displayed.</p>
                                </object>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ItemAwards;
