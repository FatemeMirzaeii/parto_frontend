import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../app/Theme';
const { size, fonts, colors } = Theme;

export default StyleSheet.create({
  sky: { width: '100%', height: '100%' },
  moon: { width: '100%', height: '80%', top: 25 },
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
  tab: {
    width: size[40],
    height: size[40],
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: size[30],
    alignSelf: 'center',
    color: '#121C3D',
  },
  moonText: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: Height / 12,
  },
  footer: {
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 30,
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
});
