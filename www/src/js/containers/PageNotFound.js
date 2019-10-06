/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageNotFound } from 'store/app/appActions';

class PageNotFound extends Component {
  componentDidMount() {
    this.props.pageNotFound();
    // window.location.href = '/404/';
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageNotFound: () => {
      dispatch(pageNotFound());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFound);
