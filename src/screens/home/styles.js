import { StyleSheet } from 'react-native';
import { SIZE, FONT, HEIGHT } from '../../styles/static';

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
  text: {
    alignSelf: 'center',
    color: '#121C3D',
    fontSize: SIZE[24],
    fontFamily: FONT.medium,
    marginBottom: 10,
  },
  text2: {
    alignSelf: 'center',
    color: '#002A7D',
    fontSize: SIZE[14],
    fontFamily: FONT.light,
  },
  moonText: {
    top: HEIGHT / 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  numtxt: {
    fontFamily: FONT.bold,
    fontSize: SIZE[27],
    color: '#121C3D',
    textAlign: 'center',
    //marginTop: HEIGHT / 20,
    alignSelf: 'center',
  },
  phasetxt: {
    fontSize: SIZE[14],
    color: '#121C3D',
    textAlign: 'center',
    //marginTop: HEIGHT / 20,
    alignSelf: 'center',
  },
});
