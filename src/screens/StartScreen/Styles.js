import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../app/Theme';
const { colors, size, fonts } = Theme;

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    elevation: 10,
    justifyContent: 'center',
    height: '80%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 25,
    top: '10%',
  },
  button: {
    alignSelf: 'center',
    bottom: -30,
    position: 'absolute',
  },
  close: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  error: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
  },
  BTNStyle: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 40,
    width: Width * 0.9,
    height: Height * 0.094,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextBTNStyle: {
    fontFamily: fonts.medium,
    fontSize: size[14],
    color: colors.textColor,
    marginBottom: 10,
  },
  TextBTNStyle1: {
    fontFamily: fonts.light,
    fontSize: size[12],
    color: colors.textColor,
  },
  imgbackground1: {
    width: (Height * 0.27) / 0.72,
    height: Height * 0.27,
    alignSelf: 'flex-end',
  },
  viq1: {
    position: 'absolute',
    alignSelf: 'center',
    top: Height * 0.16,
  },
  txtTop: {
    fontFamily: fonts.medium,
    fontSize: size[14],
    textAlign: 'center',
    color: colors.textColor,
  },
  viewbtnsq1: {
    position: 'absolute',
    height: Height * 0.32,
    width: Width * 1,
    top: Height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgendq1: {
    width: (Height * 0.2) / 0.4,
    height: Height * 0.2,
    position: 'absolute',
    bottom: 0,
    left: -91,
  },
});
