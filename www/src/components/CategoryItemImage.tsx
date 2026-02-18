import React from 'react';
import { motion } from 'framer-motion';

interface CategoryItemImageProps {
  title: string;
  thumb_path: string;
  is_responsive?: boolean;
}

const CategoryItemImage: React.FC<CategoryItemImageProps> = ({ title, thumb_path, is_responsive }) => {
  const srcSet = is_responsive
    ? thumb_path + 'thumb_2x.jpg 2x,' + thumb_path + 'thumb_1x.jpg 1x'
    : '';
  return (
    <motion.div
      className="thumb text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
    >
      <img
        crossOrigin="anonymous"
        width="350"
        height="350"
        className="img-fluid img-thumbnail"
        alt={title}
        srcSet={srcSet}
        src={thumb_path + 'thumb_1x.jpg'}
        loading="lazy"
      />
    </motion.div>
  );
};

export default CategoryItemImage;
