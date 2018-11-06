import * as Constants from 'constants/AppConstants';

const initState = {
  cropIsActive: false,
};

const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    // case Constants.APP_START:
    //   return { ...state, ...nextState };
    // case Constants.APP_START_COMPLETE:
    //   nextState.base_url = action.base_url;
    //   return { ...state, ...nextState };
    case Constants.APP_SHUTDOWN:
      nextState = initState;
      return { ...state, ...nextState };
    // case Constants.APP_START_CROP:
    //   nextState.cropIsActive = true;
    //   return { ...state, ...nextState };
    // case Constants.APP_STOP_CROP:
    //   nextState.cropIsActive = false;
    //   return { ...state, ...nextState };
  }
  return state;
};
export default reducer;
