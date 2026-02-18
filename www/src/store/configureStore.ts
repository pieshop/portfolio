import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from 'store/rootReducer';
import type { RootState } from 'store/rootReducer';

const localStorageMiddleware: Middleware<Record<string, never>, RootState> = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();
  const stateToSave = {
    filtered: state.filtered,
    itemsByID: state.itemsByID,
    categories: state.categories,
    itemsByCategory: state.itemsByCategory,
  };
  localStorage.setItem('portfolioState', JSON.stringify(stateToSave));
  return result;
};

const reHydrateStore = (): Partial<RootState> | undefined => {
  const saved = localStorage.getItem('portfolioState');
  if (saved !== null) {
    try {
      return JSON.parse(saved) as Partial<RootState>;
    } catch {
      return undefined;
    }
  }
  return undefined;
};

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: import.meta.env.DEV ? undefined : reHydrateStore(),
  middleware: (getDefaultMiddleware) => {
    const base = getDefaultMiddleware();
    if (import.meta.env.DEV) {
      return base.concat(loggerMiddleware as Middleware, localStorageMiddleware);
    }
    return base.concat(localStorageMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
