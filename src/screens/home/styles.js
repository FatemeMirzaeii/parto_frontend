import { StyleSheet } from 'react-native';
import { SIZE, FONT, HEIGHT, COLOR, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  sky: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  moon: {
    width: '100%',
    height: '65%',
    top: 5,
  },
  moonText: {
    flexDirection: 'row-reverse',
    top: -HEIGHT / 7,
    right: WIDTH / 10,
    // backgroundColor: 'red',
  },
  sentenceContainer: { top: -11, marginRight: 10 },
  mainSentence: {
    fontFamily: FONT.bold,
    fontSize: 17,
    color: COLOR.black,
    // backgroundColor: 'green',
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLOR.black,
    lineHeight: 50,
    // backgroundColor: 'purple',
  },
  thirdSentence: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLOR.black,
    lineHeight: 45,
    // backgroundColor: 'red',
  },
  calendarIcon: {
    top: 40,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
