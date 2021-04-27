import * as actions from '../actions/types';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  interviewToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        interviewToken: action.interviewToken,
        isLoading: false,
        isSignout: false,
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
        interviewToken: null,
      };
    case actions.INTERVIEW:
      return {
        ...state,
        interviewToken: action.interviewToken,
      };
    default:
      return state;
  }
};
export default authReducer;
