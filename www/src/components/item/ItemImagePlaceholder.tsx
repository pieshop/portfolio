import React from 'react';
import { Flex, Spinner } from '@radix-ui/themes';

interface ItemImagePlaceholderProps {
  width?: number;
  height?: number;
}

const ItemImagePlaceholder: React.FC<ItemImagePlaceholderProps> = ({ width = 350, height = 350 }) => {
  const placeholder_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  return (
    <div style={{ ...placeholder_style, position: 'relative', backgroundColor: 'var(--grey-light)', overflow: 'hidden' }}>
      <Flex style={{ position: 'absolute', inset: 0 }} align="center" justify="center">
        <Spinner size="3" />
      </Flex>
    </div>
  );
};

export default ItemImagePlaceholder;
