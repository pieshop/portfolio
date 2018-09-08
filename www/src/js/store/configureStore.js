import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'store/rootReducer';
import { defaultCategories } from '../constants/AppConstants';

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

const configureStore = () => {
  const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
  });

  const initialState = reHydrateStore();
  console.log('reHydrateStore ', initialState);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // lets us log actions
      localStorageMiddleware
    )
  );

  if (process.env.NODE_ENV !== 'production') {
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
