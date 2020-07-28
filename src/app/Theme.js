import { Dimensions } from 'react-native';
export const Width = Math.round(Dimensions.get('window').width);
export const Height = Math.round(Dimensions.get('window').height);
const _size =
  (Dimensions.get('window').height + Dimensions.get('window').width) / 10;

export const Theme = {
  colors: {
    text1: '#1A2D36',
    bgColor: '#FCF5F7',
    btn: '#FF488A',
    currentPage: '#79EBEE',
    nextPage: '#E0E0E0',
    textColor: '#757575',
  },
  fonts: {
    regular: 'IRANSansMobile',
    medium: 'IRANSansMobileMedium',
    bold: 'IRANSansMobileBold',
    light: 'IRANSansMobileLight',
    thin: 'IRANSansMobileUltraLight',
  },
  size: {
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
    15: Math.round(_size / 8),
    14: Math.round(_size / 9),
    12: Math.round(_size / 10),
    10: Math.round(_size / 12),
    7: Math.round(_size / 15),
    5: Math.round(_size / 24),
  },
};
