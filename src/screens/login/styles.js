import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH, HEIGHT, COLOR } from '../../styles/static';

export default StyleSheet.create({
  close: {
    position: 'absolute',
    top: 25,
    left: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  lottiewrapper: {
    height: HEIGHT / 2.3,
    width: WIDTH * 0.8,
    alignSelf: 'center',
    marginTop: '10%',
  },
  btnContainer: {
    elevation: 5,
    width: 150,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 7,
  },
  button: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.purple,
  },
  buttonSecond: {
    height: 40,
    backgroundColor: COLOR.white,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  btnSecondTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
    // color: '#4c569c',
    color: COLOR.purple,
  },
  title: {
    fontSize: SIZE[15],
    color: COLOR.black,
    alignSelf: 'center',
    fontFamily: FONT.medium,
    marginBottom: 10,
  },
});
