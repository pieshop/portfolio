import React, { useState } from 'react';
import { Fragment } from 'react';
import ItemAwardModalPortal from 'components/item/ItemAwardModalPortal';
import { get_awards_path } from 'constants/AppConstants';

interface ItemAwardProps {
  award_name: string;
  award_long_name: string;
  award_result: string;
  award_category: string;
  link: string;
  pdf: string;
  hasLink: boolean;
  hasAwardCategory: boolean;
}

const ItemAward: React.FC<ItemAwardProps> = ({
  award_name,
  award_long_name,
  award_result,
  award_category,
  link,
  pdf,
  hasLink,
  hasAwardCategory,
}) => {
  const [showModal, setShowModal] = useState(false);
  const pdf_url = get_awards_path() + pdf;

  const handlePDFClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal((s) => !s);
  };

  return (
    <div className="card card-inverse bg-success mb-3">
      <Fragment>
        <div className="card-body">
          <div className="d-flex flex-column w-100 justify-content-between">
            <h4 className="card-title mb-1" title={award_long_name}>
              {award_name}
            </h4>
            {hasLink ? (
              <Fragment>
                {pdf !== '' && (
                  <button
                    onClick={handlePDFClick}
                    className="btn btn-xs btn-primary js-pdf-award mb-2"
                  >
                    pdf
                  </button>
                )}
                {link !== '' && (
                  <a href={link} target="_blank" rel="noreferrer" className="btn btn-xs btn-primary">
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
        onClose={() => setShowModal(false)}
        pdf={pdf_url}
      />
    </div>
  );
};

export default ItemAward;
