import { SET_USER, SET_TEMPLATE, RESET } from '../actions/types';

const initialState = {
  id: null,
  phone: '',
  template: '',
};

const userReducer = (state = initialState, action) => {
  console.log('actionnnnnnnnnnnnnnn', action);
  switch (action.type) {
    case SET_TEMPLATE:
      return { ...state, template: action.template };
    case SET_USER: {
      return { ...state, id: action.id, phone: action.phone };
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;
