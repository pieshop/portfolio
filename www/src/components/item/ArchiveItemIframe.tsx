import React from 'react';
import { Flex } from '@radix-ui/themes';

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
    <Flex justify="center">
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
    </Flex>
  );
};

export default ArchiveItemIframe;
