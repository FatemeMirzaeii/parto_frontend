import { combineReducers } from 'redux';
import cycle from './cycle';
import user from './user';
import auth from './auth';
import goftino from './goftino';
import { RESET } from '../actions/types';

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }
  return combineReducers({ auth, user, cycle, goftino })(state, action);
};
export default rootReducer;
