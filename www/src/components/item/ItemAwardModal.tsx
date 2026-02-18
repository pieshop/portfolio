import React from 'react';

interface ItemAwardModalProps {
  open: boolean;
  pdf: string;
  award_name: string;
  award_result: string;
  onClose: () => void;
}

const ItemAwardModal: React.FC<ItemAwardModalProps> = ({ open, pdf, award_name, award_result, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="largeModal"
      aria-hidden="false"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{award_name}</h3>
            <button
              onClick={onClose}
              type="button"
              className="close"
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
  );
};

export default ItemAwardModal;
