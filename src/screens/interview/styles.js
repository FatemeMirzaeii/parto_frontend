import { StyleSheet } from 'react-native';
import { COLOR, SIZE, FONT, WIDTH, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.bgColor,
    flex: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  calendar: {
    top: 200,
    width: WIDTH - 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', margin: 3 },
  btnContainer: { elevation: 5 },
  nextButton: {
    backgroundColor: COLOR.btn,
    width: WIDTH / 3,
    borderRadius: 40,
  },
  prevButton: {
    backgroundColor: '#ffffff',
    width: WIDTH / 3,
    borderRadius: 40,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  darkBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
    color: COLOR.textColor,
  },
  btnSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
    color: COLOR.textColor,
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
    textAlign: 'center',
    color: COLOR.textColor,
    top: HEIGHT * 0.2,
  },
  mode: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 40,
    width: WIDTH * 0.9,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGroup: {
    top: HEIGHT * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    top: 100,
    width: WIDTH - 30,
  },
  pickerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    top: 200,
  },
  pregnancy_picker: {
    width: WIDTH / 5,
    height: HEIGHT / 3,
    marginTop: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  picker: {
    top: 200,
    width: '90%',
    height: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 30,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZE[17],
    alignSelf: 'center',
    textAlign: 'center',
  },
});
