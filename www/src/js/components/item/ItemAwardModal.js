import React, { Component } from 'react';

export default class ItemAwardModal extends Component {
  constructor() {
    super();
  }

  render() {
    const { open, pdf, award_name, award_result } = this.props;
    const visible = !open ? '' : 'show';
    const style = open ? { display: 'block' } : {};
    return this.props.open ? (
      <div
        className={'modal fade ' + visible}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="largeModal"
        aria-hidden="false"
        style={style}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{award_name}</h3>
              <button
                onClick={() => this.props.onClose()}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>{award_result}</h4>
              <div id="pdf">
                <embed
                  id="pdf_content"
                  src={pdf + '#view=FitH&scrollbar=1&toolbar=1&navpanes=0'}
                  width="100%"
                  height="600"
                  type="application/pdf"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
