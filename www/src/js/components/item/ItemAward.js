/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';

export default class ItemAward extends Component {
    constructor() {
        super();
    }

    render() {
        const {award_name, award_long_name, award_result, award_category, link, pdf, hasLink, hasAwardCategory} = this.props;
        return (
            <div class="card card-inverse bg-success mb-3">
                <div>
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="card-title mb-1" data-toggle="tooltip" data-placement="top" title={award_long_name}>{award_name}</h4>
                            {hasLink ? (
                                    <small>
                                        {pdf !== '' &&
                                        <button onClick={this.handlePDFClick} class="btn btn-xs btn-primary js-pdf-award" data-toggle="modal"
                                                data-target="#largeModal">pdf</button>
                                        }
                                        {link !== '' &&
                                        <a href={link} target="_blank" class="btn btn-xs btn-primary">link</a>
                                        }
                                    </small>
                                ) : (
                                    <small></small>
                                )}
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-title">
                            <strong>{award_result}</strong>
                            {hasAwardCategory &&
                            <small>: {award_category}</small>
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    handlePDFClick(e) {
        e.preventDefault();

        const modal = document.getElementById('awardModal');
        modal.className += ' show';
        modal.setAttribute('style', 'display: block');

        /*
         *  TODO : Add Modal
         *  http://stackoverflow.com/questions/16778336/modal-dialog-without-jquery
         *  https://github.com/tomloprod/tomloprodModal
         */
    }
}
