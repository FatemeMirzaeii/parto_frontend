import { StyleSheet } from 'react-native';
import { COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sky: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    height: 50,
    // backgroundColor: 'blue',
  },
  emptyArea: {
    flex: 2,
    // backgroundColor: 'cyan',
  },
  pregnancyIcon: {
    position: 'absolute',
    padding: 5,
    width: 45,
    borderRadius: 10,
    backgroundColor: COLOR.white,
    right: 20,
  },
  pregnancyImage: { width: 33, height: 33 },
  moonText: {
    flex: 1,
    marginBottom: 15,
    // backgroundColor: 'red',
  },

  teenagerText: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLOR.teenagerFirstText,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginBottom: HEIGHT * 0.1,
  },
  mainSentenceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
    margin: 20,
  },

  mainSentence: {
    fontFamily: FONT.bold,
    fontSize: 16,
    textAlign: 'center',
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: 16,
    padding: 5,
    //backgroundColor: 'green',
    textAlign: 'center',
  },
  thirdSentence: {
    fontFamily: FONT.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  mainTxt: {
    color: COLOR.sentence,
  },
  partnerTxt: { color: COLOR.white },
  assistantContainer: {
    // position: 'absolute',
    backgroundColor: COLOR.white,
    borderRadius: 25,
    width: 85,
    height: 38,
    // right: 15,
    paddingHorizontal: 10,
    margin: 15,
    justifyContent: 'center',
  },
  assistant: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
  },
  assistantPic: {
    width: 20,
    height: 20,
  },
  calendarIcon: {
    top: 40,
    padding: 5,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
