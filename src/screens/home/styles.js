import { StyleSheet } from 'react-native';

//styles
import { COLOR, FONT, HEIGHT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  sky: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  pregnancyIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 32,
    right: 20,
    elevation: 3,
  },
  pregnancyImage: { width: 33, height: 33 },
  moonText: {
    flexDirection: 'row-reverse',
    //top: '-30%',
    marginBottom: '7%',
    //top: -HEIGHT / 5.6,
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  sentenceContainer: {
    // marginTop: '20%',
    //alignSelf: 'flex-end',
    //backgroundColor: 'yellow',
  },
  teenagerText: {
    fontFamily: FONT.bold,
    fontSize: SIZE[16],
    color: COLOR.teenagerFirstText,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginBottom: HEIGHT * 0.1,
    // marginBottom: '30%',
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
    fontSize: SIZE[16],
    textAlign: 'center',
    // padding: 5,
  },
  subSentence: {
    fontFamily: FONT.medium,
    fontSize: SIZE[16],
    //lineHeight: 50,
    padding: '10%',
    //backgroundColor: 'green',
    textAlign: 'center',
  },
  thirdSentence: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
    ///lineHeight: 45,
    textAlign: 'center',
  },
  mainTxt: {
    color: COLOR.sentence,
  },
  partnerTxt: { color: COLOR.white },
  calendarIcon: {
    top: 40,
    padding: 5,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
});
