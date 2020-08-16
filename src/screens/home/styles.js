import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../styles/Theme';
const { size, fonts, colors } = Theme;

export default StyleSheet.create({
  sky: { width: '100%', height: '100%' },
  moon: { width: '100%', height: '80%', top: 100 },
  text: {
    alignSelf: 'center',
    color: '#121C3D',
    fontSize: size[24],
    fontFamily: fonts.medium,
    marginBottom: 10,
  },
  text2: {
    alignSelf: 'center',
    color: '#002A7D',
    fontSize: size[14],
    fontFamily: fonts.light,
  },
  moonText: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: Height / 12,
  },
  numtxt: {
    fontFamily: fonts.medium,
    fontSize: size[15],
    color: '#121C3D',
    marginTop: Height / 20,
    alignSelf: 'center',
  },
});
