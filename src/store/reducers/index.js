import { combineReducers } from 'redux';
import cycle from './cycle';
import user from './user';
import auth from './auth';
import goftino from './goftino';

export default combineReducers({ auth, user, cycle, goftino });
