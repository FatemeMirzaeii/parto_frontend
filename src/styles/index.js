import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE } from './static';

export default StyleSheet.create({
  smallHeaderBtn: {
    borderWidth: 0,
    left: 20,
    width: 50,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.btn,
    justifyContent: 'center',
  },
  headerBtnTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
  },
});
