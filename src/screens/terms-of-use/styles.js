import { StyleSheet } from 'react-native';
import { COLOR, FONT } from '../../styles/static';

export default StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  question: {
    fontFamily: FONT.medium,
    fontSize: 15,
  },
  txt: {
    fontSize: 14,
    color: COLOR.textColor,
    margin: 20,
    lineHeight: 20,
  },
});
