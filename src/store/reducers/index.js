import { combineReducers } from 'redux';
import cycleReducer from './cycle';
import ratingReducer from './rating';

export default combineReducers({ cycleReducer, ratingReducer });
