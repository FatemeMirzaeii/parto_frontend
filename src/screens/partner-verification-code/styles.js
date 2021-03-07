import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  codeBox: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 2,
    borderRadius: 20,
    width: WIDTH - 50,
    height: 125,
    backgroundColor: COLOR.white,
  },
  codeWrapper: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    width: WIDTH * 0.7,
    margin: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#aaa',
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'center',
    color: COLOR.listItemTxt,
  },
  code: {
    fontFamily: FONT.bold,
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: '#aaa',
  },
  btnContainer: {
    elevation: 5,
    width: 100,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: COLOR.pink,
    borderRadius: 40,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
});
