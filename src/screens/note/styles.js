import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  btnContainer: {
    elevation: 3,
    width: 100,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    height: 40,
    backgroundColor: COLOR.pink,
  },
  btnTitle: {
    color: COLOR.white,
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  dayText: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 16,
  },
});
