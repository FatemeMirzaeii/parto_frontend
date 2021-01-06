import {
  MAIN_MODE,
  TEENAGER_MODE,
  PARTNER_MODE,
  SET_USER,
} from '../actions/types';

const initialState = {
  id: null,
  phone: '',
  template: '',
};

const userReducer = (state = initialState, action) => {
  console.log('actionnnnnnnnnnnnnnn', action);
  switch (action.type) {
    case MAIN_MODE:
      return { ...state, template: 'main' };
    case TEENAGER_MODE:
      return { ...state, template: 'teenager' };
    case PARTNER_MODE:
      return { ...state, template: 'partner' };
    case SET_USER: {
      return { ...state, id: action.id };
    }
    default:
      return state;
  }
};

export default userReducer;
