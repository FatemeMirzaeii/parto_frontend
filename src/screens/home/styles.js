import { StyleSheet } from 'react-native';
import { SIZE, FONT, HEIGHT, COLOR, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  sky: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
  sentenceContainer: { top: -7, marginRight: 10 },
  mainSentence: {
    fontFamily: FONT.bold,
    fontSize: SIZE[17],
    color: COLOR.black,
    // backgroundColor: 'green',
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: SIZE[15],
    color: COLOR.black,
    lineHeight: 50,
    // backgroundColor: 'purple',
  },
  calendarIcon: {
    top: 40,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
