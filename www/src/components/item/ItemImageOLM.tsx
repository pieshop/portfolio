import React from 'react';
import { motion } from 'framer-motion';

interface MediaInfo {
  width?: number;
  height?: number;
  alt?: string;
  media_path?: string;
}

interface MediaNames {
  media_name_2x?: string;
  media_name_1x?: string;
}

interface ItemImageOLMProps {
  style?: string;
  media_info: MediaInfo;
  media_names: MediaNames;
}

const ItemImageOLM: React.FC<ItemImageOLMProps> = ({ style, media_info, media_names }) => {
  const { width = 500, height = 500, alt = '', media_path = '' } = media_info;
  const { media_name_2x = '', media_name_1x = '' } = media_names;
  const thumb_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  const srcSet = `${media_path}${media_name_2x} 2x, ${media_path}${media_name_1x} 1x`;
  const src = `${media_path}${media_name_1x}`;

  return (
    <div className={style}>
      <motion.div
        className="thumbnail"
        style={thumb_style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeIn' }}
      >
        <img
          crossOrigin="anonymous"
          width={width}
          height={height}
          className="img-fluid img-thumbnail"
          alt={alt}
          srcSet={srcSet}
          src={src}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default ItemImageOLM;
