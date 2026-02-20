import React from 'react';
import { motion } from 'framer-motion';
import { Flex, Spinner } from '@radix-ui/themes';
import { useInView } from 'react-intersection-observer';

interface CategoryItemImageProps {
  title: string;
  thumb_path: string;
  is_responsive?: boolean;
}

const CategoryItemImage: React.FC<CategoryItemImageProps> = ({ title, thumb_path, is_responsive }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const srcSet = is_responsive
    ? thumb_path + 'thumb_2x.jpg 2x,' + thumb_path + 'thumb_1x.jpg 1x'
    : '';

  return (
    <div ref={ref} style={{ backgroundColor: 'var(--grey-light)', textAlign: 'center', height: 0, paddingBottom: '100%' }}>
      {inView ? (
        <motion.img
          crossOrigin="anonymous"
          width="350"
          height="350"
          style={{ maxWidth: '100%', height: 'auto', border: '1px solid var(--grey-dark)' }}
          alt={title}
          srcSet={srcSet}
          src={thumb_path + 'thumb_1x.jpg'}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        />
      ) : (
        <Flex style={{ position: 'absolute', inset: 0 }} align="center" justify="center">
          <Spinner size="2" />
        </Flex>
      )}
    </div>
  );
};

export default CategoryItemImage;
