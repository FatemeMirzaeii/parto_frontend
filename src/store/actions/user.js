import { SET_TEMPLATE, SET_USER, RESET, SET_CREDIT } from './types';

export const handleTemplate = (template) => {
  return { type: SET_TEMPLATE, template };
};
export const setUser = (id, phone) => {
  return { type: SET_USER, id, phone };
};
export const setCredit = (credit) => {
  return { type: SET_CREDIT, credit };
};
export const reset = () => {
  //todo: this is a root action, maybe we can find a better place for this.
  return { type: RESET };
};
