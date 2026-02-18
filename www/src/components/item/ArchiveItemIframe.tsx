import React from 'react';

interface ArchiveItemIframeProps {
  id?: string;
  url?: string;
  frameborder?: string | number;
  inline_style?: React.CSSProperties;
  height?: number | string;
  width?: number | string;
}

const ArchiveItemIframe: React.FC<ArchiveItemIframeProps> = ({ id, url, frameborder, inline_style, height, width }) => {
  return (
    <div className="row">
      <div className="col text-center">
        <div className="thumbnail">
          <iframe
            id={id}
            src={url}
            frameBorder={frameborder}
            style={inline_style}
            height={height}
            width={width}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveItemIframe;
