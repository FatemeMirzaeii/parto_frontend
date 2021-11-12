import { StyleSheet } from 'react-native';
import { WIDTH, COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEIGHT / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: WIDTH / 1.08,
    margin: 5,
    backgroundColor: COLOR.white,
    alignItems: 'center',
    elevation: 2.5,
    borderRadius: 74,
    flexDirection: 'row-reverse',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 10,
  },

  templatetTitle: {
    fontFamily: FONT.bold,
    fontSize: 15,
    lineHeight: 20,
  },
  desc: {
    fontFamily: FONT.regular,
    fontSize: 12.5,
    color: COLOR.textColor,
    lineHeight: 23,
  },

  button: {
    flexDirection: 'row-reverse',
    width: 100,
    alignSelf: 'flex-end',
    top: 25,
    marginBottom: 20,
  },
});
