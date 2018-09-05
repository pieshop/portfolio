import React from 'react';
import { Wave } from 'better-react-spinkit';
import { get_images_path } from 'constants/AppConstants';

export default function ItemImagePlaceholder({ style, is_responsive, width = 350, height = 350 }) {
  const thumb_path = get_images_path();
  const srcSet = is_responsive
    ? thumb_path + 'site/thumb_template_2x.jpg 2x,' + thumb_path + 'site/thumb_template_1x.jpg 1x'
    : '';
  const paddingbottom = (height / width) * 100;
  const placeholder_style = { height: 0, paddingBottom: paddingbottom + '%' };
  return (
    <div class={style}>
      <div class="item__media--placeholder" style={placeholder_style}>
        <div className="spinner-container">
          <div className="center-spinner">
            <Wave color="#ccc" size={60} />
          </div>
        </div>
      </div>
    </div>
  );
}
