import React from 'react';
import { get_images_path } from 'constants/AppConstants';

export default function Placeholder({ is_responsive, width = 350, height = 350 }) {
  const thumb_path = get_images_path();
  const srcSet = is_responsive
    ? thumb_path + 'site/thumb_template_2x.jpg 2x,' + thumb_path + 'site/thumb_template_1x.jpg 1x'
    : '';
  return (
    <div className="item__thumbnail--placeholder">
      <div className="spinner-container">
        {/*<div className="spinner">*/}
        {/*/!*<img src={thumb_path + 'site/ajax-loader.gif'} />*!/*/}
        {/*<div className="rect1" />*/}
        {/*<div className="rect2" />*/}
        {/*<div className="rect3" />*/}
        {/*<div className="rect4" />*/}
        {/*<div className="rect5" />*/}
        {/*</div>*/}
        <img
          width={width}
          height={height}
          className="img-fluid img-thumbnail"
          // crossOrigin="anonymous"
          alt="placeholder"
          srcSet={srcSet}
          src={thumb_path + 'site/thumb_template_1x.jpg'}
        />
      </div>
    </div>
  );
}
