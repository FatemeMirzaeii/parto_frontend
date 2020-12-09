import { MAIN_MODE,TEENAGER_MODE,PARTNER_MODE} from './types';

export const handleMainSelected = () => {
  return { type: MAIN_MODE };
};

export const handleTeenagerSelected = () => {
  return { type: TEENAGER_MODE };
};

export const handlePartnerSelected = () => {
  return { type: PARTNER_MODE };
};
