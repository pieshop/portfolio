import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ItemAwardModal from './ItemAwardModal';

interface ItemAwardModalPortalProps {
  award_name: string;
  award_result: string;
  open: boolean;
  onClose: () => void;
  pdf: string;
}

const ItemAwardModalPortal: React.FC<ItemAwardModalPortalProps> = (props) => {
  const containerRef = useRef(document.createElement('div'));

  useEffect(() => {
    const rootSelector = document.getElementById('modal-root');
    if (rootSelector) {
      rootSelector.appendChild(containerRef.current);
    }
    return () => {
      const rootSelector = document.getElementById('modal-root');
      if (rootSelector && rootSelector.contains(containerRef.current)) {
        rootSelector.removeChild(containerRef.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(<ItemAwardModal {...props} />, containerRef.current);
};

export default ItemAwardModalPortal;
