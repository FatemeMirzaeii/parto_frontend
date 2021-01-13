import { StyleSheet } from 'react-native';

//styles
import { COLOR, FONT, HEIGHT } from '../../styles/static';

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
  sentenceContainer: {
    top: '20%',
  },
  teenagerText: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLOR.teenagerFirstText,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainSentenceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 20,
    elevation: 2,
  },

  mainSentence: {
    fontFamily: FONT.bold,
    fontSize: 16,
    // color: COLOR.black,
    textAlign: 'center',
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: 16,
    // color: COLOR.black,
    lineHeight: 50,
    textAlign: 'center',
    // backgroundColor: 'purple',
  },
  thirdSentence: {
    fontFamily: FONT.medium,
    fontSize: 14,
    // color: COLOR.black,
    lineHeight: 45,
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  bgColorPartner: {
    backgroundColor: '#6576c7',
  },
  bgColorMain: {
    //backgroundColor: '#c7b0de',
  },
  mainTxt: {
    color: COLOR.mainFirstText,
  },
  calendarIcon: {
    top: 40,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
