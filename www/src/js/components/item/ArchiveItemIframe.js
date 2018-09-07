/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';

const ArchiveItemIframe = ({ id, url, frameborder, inline_style, height, width }) => {
  // console.log('inline_style', inline_style);
  return (
    <div class="row">
      <div class="col text-center">
        <div class="thumbnail">
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
