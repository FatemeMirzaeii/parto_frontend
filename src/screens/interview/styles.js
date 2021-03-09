import { StyleSheet } from 'react-native';
import { COLOR, FONT, WIDTH, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.bgColor,
    flex: 1,
  },
  safeAreaView: {
    flex: 3,
    marginTop: '10%',
    justifyContent: 'space-between',
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  calendar: {
    width: WIDTH - 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 3,
    marginBottom: '5%', //for responsive
  },
  modalBtnWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    margin: 3,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
    marginTop: 10,
  },
  nextButton: {
    height: 40,
    backgroundColor: COLOR.purple,
  },
  prevButton: {
    backgroundColor: COLOR.white,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: 13,
  },
  darkBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLOR.textColor,
  },
  btnSubtitle: {
    fontFamily: FONT.regular,
    fontSize: 11,
    color: COLOR.textColor,
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColorDark,
    lineHeight: 30,
    paddingTop: 20,
  },
  subtext: {
    fontFamily: FONT.medium,
    fontSize: 13,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
  },
  modal: {
    backgroundColor: COLOR.white,
    borderRadius: 15,
    padding: 20,
  },
  modalTxt: {
    margin: 20,
  },
  mode: {
    backgroundColor: COLOR.white,
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
    width: WIDTH - 90,
  },
  pickerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT / 4,
  },
  pregnancy_picker: {
    width: WIDTH / 5,
    height: HEIGHT / 3,
    marginTop: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  picker: {
    width: '75%',
    height: HEIGHT / 4,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: '4%',
  },
  text: {
    fontFamily: FONT.medium,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 30,
  },
  cont: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // height: HEIGHT / 1.2,
    //backgroundColor: 'red',
    marginTop: '10%', //response in 4 inch
    flex: 6,
  },
  codeInpute: {
    borderColor: COLOR.partner,
    borderWidth: 3,
    borderRadius: 60,
    width: WIDTH * 0.8,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    top: 75,
  },
});
