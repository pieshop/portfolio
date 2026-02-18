import React from 'react';

interface ItemImagePlaceholderProps {
  style?: string;
  width?: number;
  height?: number;
}

const ItemImagePlaceholder: React.FC<ItemImagePlaceholderProps> = ({ style, width = 350, height = 350 }) => {
  const placeholder_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  return (
    <div className={style}>
      <div className="item__media--placeholder" style={placeholder_style}>
        <div className="spinner-container">
          <div className="center-spinner">
            <div className="loading-spinner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemImagePlaceholder;
