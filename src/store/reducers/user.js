import {
  SET_TEMPLATE,
  SET_LOCK_TYPE,
  SET_PASSCODE,
  SET_USER,
  SET_NOTE,
  RESET,
} from '../actions/types';

const initialState = {
  id: null,
  phone: '',
  template: 'Main',
  passcode: null,
  lockType: 'None',
  note: [],
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

    case SET_NOTE: {
      return {
        ...state,
        note: action.payload,
      };
    }

    case SET_USER: {
      return { ...state, id: action.id, phone: action.phone };
    }

    case RESET: {
      return {
        id: null,
        phone: '',
        template: '',
        passcode: null,
        lockType: 'None',
        note: [],
      };
    }

    default:
      return state;
  }
};

export default userReducer;
