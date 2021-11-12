import {
  SET_TEMPLATE,
  SET_LOCK_TYPE,
  SET_PASSCODE,
  SET_USER,
  SET_CREDIT,
} from '../actions/types';

const initialState = {
  id: null,
  phone: '',
  template: 'Main',
  passcode: null,
  lockType: 'None',
  credit: null,
};

const userReducer = (state = initialState, action) => {
  console.log('actionnnnnnnnnnnnnnn', action);
  switch (action.type) {
    case SET_TEMPLATE:
      return { ...state, template: action.template };
    case SET_LOCK_TYPE: {
      return { ...state, lockType: action.lockType };
    }
    case SET_PASSCODE:
      return { ...state, passcode: action.passcode };
    case SET_USER: {
      return { ...state, id: action.id, phone: action.phone };
    }
    case SET_CREDIT: {
      return { ...state, credit: action.credit };
    }
    default:
      return state;
  }
};

export default userReducer;
