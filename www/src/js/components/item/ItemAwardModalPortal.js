import React from 'react';
import ReactDOM from 'react-dom';

import ItemAwardModal from './ItemAwardModal';

class ItemAwardModalPortal extends React.Component {
  constructor(props) {
    super(props);

    this.rootSelector = document.getElementById('modal-root');
    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<ItemAwardModal {...this.props} />, this.container);
  }
}

export default ItemAwardModalPortal;
