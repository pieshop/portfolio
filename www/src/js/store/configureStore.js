import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'store/rootReducer';

const configureStore = (initialState) => {
  const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // lets us log actions
    )
  );

  if (process.env.NODE_ENV !== 'production') {
    // if (module.hot) {
    //     module.hot.accept('store/rootReducer', () => {
    //         const newRootReducer = require('store/rootReducer').default;
    //         store.replaceReducer(newRootReducer);
    //     });
    // }
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer');
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
};
export default configureStore;