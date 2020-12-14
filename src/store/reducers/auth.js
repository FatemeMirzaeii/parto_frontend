import * as actions from '../actions/types';

const initialState = {
  isLoading: true,
  isSignout: true,
  userToken: null,
  interviewToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        interviewToken: action.iToken,
        isLoading: false,
      };
    case actions.SIGN_IN:
      return {
        ...state,
        userToken: action.token,
        isSignout: false,
      };
    case actions.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    case actions.INTERVIEW:
      return {
        ...state,
        interviewToken: action.iToken,
      };
    default:
      return state;
  }
};
export default authReducer;
