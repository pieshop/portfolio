/* global __DEV__:false, __SERVICE_WORKER__:false */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import './../sass/main.scss';
import 'TweenMax';
import { get_config } from 'constants/AppConstants';
import App from './App';
import 'babel-polyfill';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

get_config();

const store = configureStore();

console.log('>> NODE_ENV = ', process.env.NODE_ENV, '| __SERVICE_WORKER__ = ', __SERVICE_WORKER__);

const doRender = (Component = App) => {
  render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <Component store={store} />
      </Provider>
    </AppContainer>,
    document.getElementById('app-root')
  );
};

if (process.env.NODE_ENV === 'production') {
  /**
   * production environment : no hot module
   */
  /**
   * Service Worker
   * https://github.com/goldhand/sw-precache-webpack-plugin
   */
  if (__SERVICE_WORKER__) {
    if ('serviceWorker' in navigator) {
      // console.log('Service worker available!');
      const runtime = require('serviceworker-webpack-plugin/lib/runtime');

      runtime.register().then((reg) => {
        //     // console.log('Service worker registered!');
      });
    } else {
      console.info('service worker not supported by browser.');
    }
  }
  doRender(App);
} else {
  /**
   * for non production (eg watch) environment use hot module
   */
  doRender(App);
  /**
   * HMR : https://github.com/webpack/webpack-dev-server/issues/100
   */
  module.hot.accept('./App.js', () => {
    const NextRootContainer = require('./App.js').default;
    doRender(NextRootContainer);
  });
}
