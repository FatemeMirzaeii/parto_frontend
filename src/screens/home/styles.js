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
    top: -HEIGHT / 3.5,
    // right: WIDTH / 10,
    //backgroundColor: 'green',
    justifyContent: 'center',
  },
  sentenceContainer: { top: 20 },
  teenagerText: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLOR.teenagerFirstText,
    //backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainSentence: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLOR.black,
    textAlign: 'center',
    // backgroundColor: 'green',
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: 14.5,
    color: COLOR.black,
    lineHeight: 50,
    textAlign: 'center',
    // backgroundColor: 'purple',
  },
  thirdSentence: {
    fontFamily: FONT.medium,
    fontSize: 14.5,
    color: COLOR.black,
    lineHeight: 45,
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  calendarIcon: {
    top: 40,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
