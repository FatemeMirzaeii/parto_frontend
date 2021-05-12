import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH, COLOR } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: { flex: 1, paddingBottom: 53 },
  box: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: WIDTH - 50,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
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
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.pink,
  },
  btnTitle: {
    color: COLOR.white,
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  nextButton: {
    backgroundColor: COLOR.pink,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },
  avatar: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    margin: 10,
  },
  picker: { alignItems: 'center' },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  register: {
    backgroundColor: COLOR.pink,
    borderRadius: 25,
    width: WIDTH / 1.1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  name: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    padding: 5,
  },
  saveButton: {
    borderWidth: 0.7,
    borderRadius: 30,
    borderColor: COLOR.pink,
  },
  saveContainer: {
    width: WIDTH / 1.1,
    alignSelf: 'center',
    margin: 10,
  },
  saveTitle: {
    color: COLOR.pink,
    fontFamily: FONT.bold,
    fontSize: SIZE[18],
  },
  text: {
    fontFamily: FONT.regular,
    textAlign: 'center',
  },
});
