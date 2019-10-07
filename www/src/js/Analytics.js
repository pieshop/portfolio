/* global __GA__:false */
// https://github.com/react-ga/react-ga/issues/122
import { ANALYTICS_ID } from 'constants/AppConstants';
import * as ReactGA from 'react-ga';
import React, { Component } from 'react';

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    if (__GA__) {
      ReactGA.initialize(ANALYTICS_ID, { debug: false });
    }
    // if (debug) {
    //   ReactGA.ga('set', 'sendHitTask', null);
    // }
  }

  componentDidMount() {
    // Initial page load - only fired once
    this.sendPageChange(this.props.location.pathname, this.props.location.search);
  }

  /*
   * TODO : Refactor to get rid of UNSAFE_componentWillReceiveProps
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // When props change, check if the URL has changed or not
    if (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    ) {
      this.sendPageChange(nextProps.location.pathname, nextProps.location.search);
    }
  }

  sendPageChange(pathname, search = '') {
    const page = pathname + search;
    if (__GA__) {
      ReactGA.set({ page });
      ReactGA.pageview(page);
    }
  }

  render() {
    return null;
  }
}
