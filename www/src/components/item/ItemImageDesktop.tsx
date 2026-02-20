import React from 'react';
import { motion } from 'framer-motion';

interface MediaInfo {
  width?: number;
  height?: number;
  alt?: string;
  media_path?: string;
  is_single_item?: boolean;
}

interface MediaNames {
  media_name_3x?: string;
  media_name_2x?: string;
  media_name_1x?: string;
}

interface ItemImageDesktopProps {
  media_info: MediaInfo;
  media_names: MediaNames;
  onLoad?: () => void;
}

const ItemImageDesktop: React.FC<ItemImageDesktopProps> = ({ media_info, media_names, onLoad }) => {
  const { width = 500, height = 500, alt = '', media_path = '' } = media_info;
  const { media_name_3x = '', media_name_2x = '', media_name_1x = '' } = media_names;
  const thumb_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  const srcSet = `${media_path}${media_name_3x} 1024w, ${media_path}${media_name_2x} 768w, ${media_path}${media_name_1x} 480w`;
  const sizes = '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw';
  const src = `${media_path}${media_name_1x}`;

  return (
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
          style={{ maxWidth: '100%', height: 'auto', border: '1px solid var(--grey-dark)' }}
          alt={alt}
          srcSet={srcSet}
          src={src}
          sizes={sizes}
          loading="lazy"
          onLoad={onLoad}
        />
    </motion.div>
  );
};

export default ItemImageDesktop;
