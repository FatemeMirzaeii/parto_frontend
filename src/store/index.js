import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({});

const configureStore = () => createStore(reducer);

export default configureStore;
