import React from 'react';
import { get_images_path } from 'constants/AppConstants';

interface PlaceholderProps {
  is_responsive?: boolean;
  width?: number;
  height?: number;
}

const Placeholder: React.FC<PlaceholderProps> = ({ is_responsive, width = 350, height = 350 }) => {
  const thumb_path = get_images_path();
  const srcSet = is_responsive
    ? thumb_path + 'site/thumb_template_2x.jpg 2x,' + thumb_path + 'site/thumb_template_1x.jpg 1x'
    : '';
  return (
    <div className="item__thumbnail--placeholder">
      <div className="spinner-container">
        <img
          width={width}
          height={height}
          className="img-fluid img-thumbnail"
          alt="placeholder"
          srcSet={srcSet}
          src={thumb_path + 'site/thumb_template_1x.jpg'}
        />
      </div>
    </div>
  );
};

export default Placeholder;
