import React from 'react';
import { get_images_path } from 'constants/AppConstants';

export default function Placeholder({ is_responsive, width = 350, height = 350 }) {
  const thumb_path = get_images_path();
  const srcSet = is_responsive
    ? thumb_path + 'site/thumb_template_2x.jpg 2x,' + thumb_path + 'site/thumb_template_1x.jpg 1x'
    : '';
  return (
    <div class="item__thumbnail--placeholder">
      <div class="spinner-container">
        {/*<div class="spinner">*/}
        {/*/!*<img src={thumb_path + 'site/ajax-loader.gif'} />*!/*/}
        {/*<div class="rect1" />*/}
        {/*<div class="rect2" />*/}
        {/*<div class="rect3" />*/}
        {/*<div class="rect4" />*/}
        {/*<div class="rect5" />*/}
        {/*</div>*/}
        <img
          width={width}
          height={height}
          class="img-fluid img-thumbnail"
          // crossOrigin="anonymous"
          alt="placeholder"
          srcSet={srcSet}
          src={thumb_path + 'site/thumb_template_1x.jpg'}
        />
      </div>
    </div>
  );
}
