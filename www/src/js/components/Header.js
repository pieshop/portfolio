import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from 'containers/NavBar';
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('Loader.render', this.state.isVisible);
    return (
      <header>
        <div class="page-header text-center">
          <h1>
            Stephen Hamilton <small class="text-muted">Interactive Developer</small>
          </h1>
        </div>
        <NavBar {...this.props} />
      </header>
    );
  }
}
