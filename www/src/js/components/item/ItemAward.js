import React, { Component, Fragment } from 'react';
import ItemAwardModalPortal from 'components/item/ItemAwardModalPortal';
import { get_awards_path } from 'constants/AppConstants';
export default class ItemAward extends Component {
  constructor() {
    super();
    this.handlePDFClick = this.handlePDFClick.bind(this);
    this.onClosePDF = this.onClosePDF.bind(this);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      award_name,
      award_long_name,
      award_result,
      award_category,
      link,
      pdf,
      hasLink,
      hasAwardCategory,
    } = this.props;
    const { showModal } = this.state;
    const pdf_url = get_awards_path() + pdf;
    return (
      <div className="card card-inverse bg-success mb-3">
        <Fragment>
          <div className="card-body">
            <div className="d-flex flex-column w-100 justify-content-between">
              <h4
                className="card-title mb-1"
                data-toggle="tooltip"
                data-placement="top"
                title={award_long_name}
              >
                {award_name}
              </h4>
              {hasLink ? (
                <Fragment>
                  {pdf !== '' && (
                    <button
                      onClick={this.handlePDFClick}
                      className="btn btn-xs btn-primary js-pdf-award mb-2"
                      data-toggle="modal"
                      data-target="#largeModal"
                    >
                      pdf
                    </button>
                  )}
                  {link !== '' && (
                    <a href={link} target="_blank" className="btn btn-xs btn-primary">
                      link
                    </a>
                  )}
                </Fragment>
              ) : (
                <small />
              )}
            </div>
          </div>
          <div className="card-body">
            <p className="card-title">
              <strong>{award_result}</strong>
              {hasAwardCategory && <small>: {award_category}</small>}
            </p>
          </div>
        </Fragment>
        <ItemAwardModalPortal
          award_name={award_name}
          award_result={award_result + ' : ' + award_category}
          open={showModal}
          onClose={this.onClosePDF}
          pdf={pdf_url}
        />
      </div>
    );
  }

  onClosePDF() {
    // e.preventDefault();
    console.log('onClosePDF');
    this.setState({
      showModal: false,
    });
  }

  handlePDFClick(e) {
    e.preventDefault();
    const showModal = !this.state.showModal;
    this.setState({ showModal });
    // const modal = document.getElementById('awardModal');
    // modal.className += ' show';
    // modal.setAttribute('style', 'display: block');

    /*
     *  TODO : Add Modal
     *  http://stackoverflow.com/questions/16778336/modal-dialog-without-jquery
     *  https://github.com/tomloprod/tomloprodModal
     */
  }
}
