import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE, WIDTH } from './static';

export default StyleSheet.create({
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  prevButton: {
    backgroundColor: COLOR.white,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  btnDarkTitle: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLOR.textColor,
  },
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
    //todo: should make components for regular list items. same as PickerListItem
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
  regularTxt: {
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'center',
    color: COLOR.listItemTxt,
  },
  regularRightTxt: {
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'right',
    color: COLOR.listItemTxt,
  },
  creditBox: {
    borderRadius: 100,
    height: 40,
    backgroundColor: 'rgba(246, 246, 246, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  coin: { width: 20, height: 20, marginLeft: 5 },
});
