import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH, COLOR } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: { flex: 1, paddingTop: 25, paddingBottom: 53 },
  box: {
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
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  btnContainer: {
    elevation: 3,
    width: 150,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 30,
  },
  button: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.pink,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  nextButton: {
    backgroundColor: COLOR.pink,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },

  listItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
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
