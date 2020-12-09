import { MAIN_MODE,TEENAGER_MODE,PARTNER_MODE } from '../actions/types';

const initialState = {
  mode:''
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_MODE:
      return {...state, mode: 'main'};  
    case TEENAGER_MODE:
      return {...state, mode: 'teenager'};  
    case PARTNER_MODE:
      return {...state, mode: 'partner'};  
    default:
      return state;
  }
};

export default ratingReducer;
