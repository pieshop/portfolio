import { push } from 'connected-react-router';

import * as Constants from 'constants/AppConstants';

const bootstrapStart = () => {
  return {
    type: Constants.APP_START,
  };
};

const bootstrapComplete = () => {
  return {
    type: Constants.APP_START_COMPLETE,
  };
};

const shutdown = () => {
  return {
    type: Constants.APP_SHUTDOWN,
  };
};

const shutdownComplete = () => {
  return {
    type: Constants.APP_SHUTDOWN_COMPLETE,
  };
};

const startUp = (state) => {
  return (dispatch) => {
    dispatch(bootstrapStart());
  };
};

export const bootstrap = () => {
  return (dispatch, getState) => {
    dispatch(startUp(getState()));
  };
};

// window.closeImageupload();
export const pageNotFound = () => {
  return (dispatch, getState) => {
    dispatch(shutdown(getState()));
    dispatch(push('/'));
    window.pageNotFound();
  };
};
