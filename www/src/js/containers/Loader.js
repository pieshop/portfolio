import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIsFetching } from 'store/items/itemsSelectors';

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Aux = (props) => {
      return props.children;
    };

    const isVisible = this.props.isFetching || false;
    // console.log('Loader.render', isVisible);
    return <Aux>{isVisible && <div class="loading" />}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
  };
};

export default connect(mapStateToProps)(Loader);
