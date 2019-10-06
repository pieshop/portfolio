/* global __WATCH__:false, __SERVICE_WORKER__:false */
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reduxfreezeMiddleware from 'redux-freeze';
import { applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from 'store/rootReducer';

/**
 * Add all the state in local storage
 * @param getState
 * @returns {function(*): function(*=)}
 */

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const state = getState();
    const stateToSave = {
      filtered: state.filtered,
      itemsByID: state.itemsByID,
      categories: state.categories,
      itemsByCategory: state.itemsByCategory,
    };
    localStorage.setItem('portfolioState', JSON.stringify(stateToSave));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('portfolioState') !== null) {
    return JSON.parse(localStorage.getItem('portfolioState')); // re-hydrate the store
  }
};

const configureStore = (history) => {
  const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
  });

  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    loggerMiddleware,
    localStorageMiddleware,
  ];
  if (__WATCH__) {
    middlewares.unshift(reduxfreezeMiddleware);
  }

  const initialState = __WATCH__ ? {} : reHydrateStore();
  console.log('reHydrateStore ', initialState);

  const store = createStore(
    createRootReducer(history),
    // connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  if (__WATCH__) {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        const nextRootReducer = require('./rootReducer').default;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};
export default configureStore;
