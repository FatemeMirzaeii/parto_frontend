import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    right: 40,
  },
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
    fontSize: 14,
  },
  dayText: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 16,
    minWidth: 100,
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: 14,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: COLOR.pink,
  },
});
