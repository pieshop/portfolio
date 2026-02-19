import React from 'react';

interface MediaInfo {
  media_path?: string;
}

interface MediaNames {
  media_name?: string;
}

interface ItemPDFProps {
  media_info: MediaInfo;
  media_names: MediaNames;
}

const ItemPDF: React.FC<ItemPDFProps> = ({ media_info, media_names }) => {
  const { media_path = '' } = media_info;
  const { media_name = '' } = media_names;
  return (
    <div className="thumbnail">
        <embed
          id="pdf_content"
          src={media_path + media_name + '#view=FitH&scrollbar=1&toolbar=1&navpanes=0'}
          width="100%"
          height="600"
          type="application/pdf"
        />
    </div>
  );
};

export default ItemPDF;
