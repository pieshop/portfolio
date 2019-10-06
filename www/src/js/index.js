/* global __WATCH__:false, __SERVICE_WORKER__:false, __GA__:false */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/main.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { get_config } from 'constants/AppConstants';
import { createBrowserHistory } from 'history';
import prettyLog from 'utils/prettyLog';
import App from './App';

get_config();

const history = createBrowserHistory();
const store = configureStore(history);

const logInfo = () => {
  prettyLog.add([
    {
      key: 'Info',
      value: [
        { key: 'Node Env:', value: process.env.NODE_ENV },
        { key: 'Service Worker:', value: __SERVICE_WORKER__ },
        { key: 'Google Analytics:', value: __GA__ },
      ],
    },
  ]);
  prettyLog.print();
};

logInfo();

const doRender = (Component = App) => {
  render(
    <Provider store={store}>
      <Component history={history} />
    </Provider>,
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
      console.log('Service worker available!');
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.info('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.info('SW registration failed: ', registrationError);
        });
    } else {
      console.info('service worker not available.');
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
  if (__WATCH__) {
    module.hot.accept('./App.js', () => {
      const NextRootContainer = require('./App.js').default;
      doRender(NextRootContainer);
    });
  }
}
