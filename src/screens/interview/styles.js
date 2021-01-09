import { StyleSheet } from 'react-native';
import { COLOR, SIZE, FONT, WIDTH, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.bgColor,
    flex: 1,
  },
  safeAreaView: {
    backgroundColor: COLOR.bgColor,
    flex: 1,
    paddingTop: 25,
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  calendar: {
    width: WIDTH - 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    margin: 3,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  nextButton: {
    height: 40,
    backgroundColor: COLOR.btn,
  },
  prevButton: {
    backgroundColor: COLOR.white,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  darkBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLOR.textColor,
  },
  btnSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
    color: COLOR.textColor,
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
    paddingTop: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTxt: {
    margin: 20,
  },
  mode: {
    backgroundColor: 'white',
    margin: 7,
    padding: 15,
    borderRadius: 15,
    width: WIDTH * 0.6,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    // width:'70%',
    //backgroundColor:'red'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width: WIDTH - 30,
  },
  pickerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pregnancy_picker: {
    width: WIDTH / 5,
    height: HEIGHT / 3,
    marginTop: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  picker: {
    width: '90%',
    height: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 30,
  },
  text: {
    fontFamily: FONT.medium,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 30,
  },
  cont: {
    justifyContent: 'space-evenly',
    height: HEIGHT / 1.5,
  },
});
