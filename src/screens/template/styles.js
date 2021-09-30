import { StyleSheet } from 'react-native';
import { WIDTH, COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEIGHT / 4.5,
    justifyContent: 'space-around',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
  },
  header: {
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
    marginBottom: 20,
  },
  whiteBox: {
    width: WIDTH / 1.03,
    height: HEIGHT / 6.6,
    margin: 8,
    elevation: 2.5,
    borderRadius: 74,
    flexDirection: 'row-reverse',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
    //style for carousel
    // width: '100%',
    // height: '100%',
    // resizeMode: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 10,
    //style for carousel
    // flexDirection: 'row-reverse',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginTop: 20,
    // width: 200,
  },
  // textbox: {
  //   elevation: 1,
  //   borderRadius: 30,
  //   width: 130,
  // },

  templatetTitle: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: '#111111',
    lineHeight: 40,
  },
  desc: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLOR.textColor,
    lineHeight: 26,
    //style for carousel
    //textAlign: 'center',
    //lineHeight: 30,
    //padding: 15,
  },
  // carousel: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // item: {
  //   width: 150,
  //   height: 180,
  // },

  button: {
    flexDirection: 'row-reverse',
    width: 100,
    alignSelf: 'flex-end',
    top: 25,
    marginBottom: 20,
  },
});
