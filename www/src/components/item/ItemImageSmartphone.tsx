import React from 'react';
import { motion } from 'framer-motion';

interface MediaInfo {
  width?: number;
  height?: number;
  alt?: string;
  media_path?: string;
}

interface MediaNames {
  media_name?: string;
}

interface ItemImageSmartphoneProps {
  style?: string;
  media_info: MediaInfo;
  media_names: MediaNames;
}

const ItemImageSmartphone: React.FC<ItemImageSmartphoneProps> = ({ style, media_info, media_names }) => {
  const { width = 500, height = 500, alt = '', media_path = '' } = media_info;
  const { media_name = '' } = media_names;
  const thumb_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  const src = `${media_path}${media_name}`;

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
          src={src}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default ItemImageSmartphone;
