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
    justifyContent: 'space-evenly',
    flex: 1,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  question: {
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
    paddingTop: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  cont: {
    justifyContent: 'space-evenly',
    height: HEIGHT / 1.5,
  },
});
