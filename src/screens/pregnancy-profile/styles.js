import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 20,
  },
  calendar: {
    width: WIDTH - 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    borderRadius: 40,
    alignSelf: 'center',
  },
  nextButton: {
    backgroundColor: COLOR.pink,
  },
  saveButton: {
    elevation: 5,
    backgroundColor: COLOR.pink,
    marginTop: 30,
    width: WIDTH - 20,
    alignSelf: 'center',
  },
  saveContainer: {
    backgroundColor: COLOR.pink,
    borderWidth: 0,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },
  saveTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    color: COLOR.white,
  },
  deleteButton: {
    marginTop: 10,
    width: WIDTH - 20,
    alignSelf: 'center',
  },
  deleteContainer: {
    borderWidth: 0,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },
  deleteTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    color: COLOR.pink,
    textDecorationLine: 'underline',
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
  listItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    maxWidth: 200,
  },
  subTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
});
