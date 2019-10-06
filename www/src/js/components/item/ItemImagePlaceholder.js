import React from 'react';
import { Wave } from 'better-react-spinkit';

export default function ItemImagePlaceholder({ style, width = 350, height = 350 }) {
  const placeholder_style = {
    height: 0,
    marginBottom: '10px',
    paddingBottom: (height / width) * 100 + '%',
  };
  return (
    <div className={style}>
      <div className="item__media--placeholder" style={placeholder_style}>
        <div className="spinner-container">
          <div className="center-spinner">{<Wave color="#ccc" size={60} />}</div>
        </div>
      </div>
    </div>
  );
}
