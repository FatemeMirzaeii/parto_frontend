import { Dimensions } from 'react-native';
export const WIDTH = Math.round(Dimensions.get('window').width);
export const HEIGHT = Math.round(Dimensions.get('window').height);
export const COLOR = {
  white: '#ffffff',
  black: '#111111',
  text1: '#1A2D36',
  bgColor: '#FCF5F7',
  btn: '#ec5f91',
  lightPink: '#fdf1f1',
  tiffany: '#0BB4B4',
  bleeding: '#e23343',
  today: '#c6d436',
  // currentPage: '#79EBEE',
  nextPage: '#E0E0E0',
  textColor: '#757575',
  textColorDark: '#424242',
  // reView: '#9E9E9E',
  story: '#322C6D',
  periodPerdiction: '#F9616F',
  vaginalAndSleep: '#B6D443',
};
export const FONT = {
  regular: 'IRANSansMobile(FaNum)',
  medium: 'IRANSansMobile(FaNum)_Medium',
  bold: 'IRANSansMobile(FaNum)_Bold',
  light: 'IRANSansMobile(FaNum)_Light',
  ultra_light: 'IRANSansMobile(FaNum)_UltraLight',
  black: 'IRANSansMobile(FaNum)_Black',
};
const _size =
  (Dimensions.get('window').height + Dimensions.get('window').width) / 10;

export const SIZE = {
  130: Math.round(_size / 0.85),
  120: Math.round(_size),
  100: Math.round(_size / 1.15),
  90: Math.round(_size / 1.3),
  80: Math.round(_size / 1.5),
  70: Math.round(_size / 1.7),
  60: Math.round(_size / 2),
  50: Math.round(_size / 2.4),
  45: Math.round(_size / 2.5),
  40: Math.round(_size / 3),
  38: Math.round(_size / 3.2),
  35: Math.round(_size / 3.5),
  30: Math.round(_size / 4),
  27: Math.round(_size / 4.5),
  24: Math.round(_size / 5),
  23: Math.round(_size / 5.3),
  21: Math.round(_size / 6),
  19: Math.round(_size / 6.5),
  17: Math.round(_size / 7),
  16: Math.round(_size / 8.5),
  15: Math.round(_size / 8),
  14: Math.round(_size / 9),
  12: Math.round(_size / 10),
  11: Math.round(_size / 11),
  10: Math.round(_size / 12),
  7: Math.round(_size / 15),
  5: Math.round(_size / 24),
};
