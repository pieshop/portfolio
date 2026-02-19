import React from 'react';
import { Spinner } from '@radix-ui/themes';

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
    <div className="item__media--placeholder" style={placeholder_style}>
      <div className="spinner-container">
        <Spinner size="3" />
      </div>
    </div>
  );
};

export default ItemImagePlaceholder;
