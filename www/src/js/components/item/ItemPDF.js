/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';

const ItemPDF = ({ media_info, media_names, style }) => {
  const { media_path } = media_info;
  const { media_name } = media_names;
  // console.log('ItemPDF', media_name, media_path);
  return (
    <div className={style}>
      <div className="thumbnail">
        <embed
          id="pdf_content"
          src={media_path + media_name + '#view=FitH&scrollbar=1&toolbar=1&navpanes=0'}
          width="100%"
          height="600"
          type="application/pdf"
        />
      </div>
    </div>
  );
};
export default ItemPDF;
