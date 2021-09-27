import { SET_TEMPLATE, SET_USER, SET_CREDIT, SET_NOTE } from '../actions/types';

const initialState = {
  id: null,
  phone: '',
  template: 'Main',
  credit: null,
  note: [],
};

const userReducer = (state = initialState, action) => {
  console.log('actionnnnnnnnnnnnnnn', action);
  switch (action.type) {
    case SET_TEMPLATE:
      return { ...state, template: action.template };

    case SET_USER: {
      return { ...state, id: action.id, phone: action.phone };
    }
    case SET_CREDIT: {
      return { ...state, credit: action.credit };
    }

    case SET_NOTE: {
      return {
        ...state,
        note: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
