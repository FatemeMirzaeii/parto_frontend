import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH, COLOR } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: { flex: 1, paddingTop: 25, paddingBottom: 50 },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  goals: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: WIDTH / 1.2,
    height: 26,
    flexDirection: 'row-reverse',
  },
  goal: { borderRadius: 50 },
  btnContainer: {
    elevation: 5,
    backgroundColor: COLOR.btn,
    marginVertical: 30,
    width: WIDTH - 20,
    alignSelf: 'center',
   // marginBottom: 30,
  },
  nextButton: {
    backgroundColor: COLOR.btn,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
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
    elevation: 5,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    margin: 10,
    paddingRight: 10,
    fontFamily: FONT.bold,
    fontSize: SIZE[21],
  },
  picker: { alignItems: 'center' },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  register: {
    backgroundColor: COLOR.btn,
    borderRadius: 25,
    width: WIDTH / 1.1,
    alignSelf: 'center',
    padding: 5,
    marginTop: 10,
  },
  name: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    padding: 5,
  },
  saveButton: {
    borderWidth: 0.7,
    borderRadius: 30,
    borderColor: COLOR.btn,
  },
  saveContainer: {
    width: WIDTH / 1.1,
    alignSelf: 'center',
    margin: 10,
  },
  saveTitle: {
    color: COLOR.btn,
    fontFamily: FONT.bold,
    fontSize: SIZE[18],
  },
});
