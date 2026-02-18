import React from 'react';
import { motion } from 'framer-motion';

interface LazyLoadFadeImageProps {
  width?: number;
  height?: number;
  clazz?: string;
  title?: string;
  srcSet?: string;
  src: string;
}

const LazyLoadFadeImage: React.FC<LazyLoadFadeImageProps> = ({ width, height, clazz, title, srcSet, src }) => {
  return (
    <motion.img
      width={width}
      height={height}
      className={clazz}
      alt={title}
      srcSet={srcSet}
      src={src}
      loading="lazy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
    />
  );
};

export default LazyLoadFadeImage;
