import { SET_TEMPLATE, SET_USER, RESET } from './types';

export const handleTemplate = (template) => {
  return { type: SET_TEMPLATE, template };
};

export const setUser = (id, phone) => {
  return { type: SET_USER, id, phone };
};

export const reset = () => {
  return { type: RESET };
};
