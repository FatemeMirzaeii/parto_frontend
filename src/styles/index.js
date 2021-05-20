import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE } from './static';

export default StyleSheet.create({
  smallHeaderBtn: {
    borderWidth: 0,
    left: 20,
    width: 50,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.purple,
    justifyContent: 'center',
  },
  headerBtnTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: 170,
    height: 170,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemTitle: {
    color: COLOR.listItemTxt,
    fontFamily: FONT.regular,
    fontSize: 12,
    maxWidth: 200,
  },
  listItemContentContainer: {
    alignItems: 'flex-end',
  },
  subTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
});
