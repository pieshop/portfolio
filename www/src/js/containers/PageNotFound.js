/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageNotFound } from 'store/app/appActions';

class PageNotFound extends Component {
  componentDidMount() {
    this.props.pageNotFound();
  }

  render() {
    return (
      <div class="aboutme">
        <div class="row">
          <div class="col">
            <div class="page-header">
              <h1>Ooooops....</h1>
            </div>
          </div>
        </div>
      </div>
    );
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
