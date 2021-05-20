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
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    // flex: 1,
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 20,
  },
  btnsWrapper: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  btnContainer: {
    elevation: 3,
    width: 150,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 5,
    marginVertical: 20,
  },
  button: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.pink,
  },
  deletebutton: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.white,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  deleteBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
    color: COLOR.pink,
  },
  // btnContainer: {
  //   elevation: 5,
  //   width: WIDTH / 3,
  //   borderRadius: 40,
  //   alignSelf: 'center',
  // },
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
});
