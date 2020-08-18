import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  goals: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: WIDTH / 1.2,
    height: 26,
  },
  goal: { borderRadius: 50 },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
  },
  listItem: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
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
    fontSize: SIZE[24],
  },
  picker: { alignItems: 'center' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  register: {
    backgroundColor: 'tomato',
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
    borderColor: 'tomato',
  },
  saveContainer: {
    width: WIDTH / 1.1,
    alignSelf: 'center',
    margin: 10,
  },
  saveTitle: {
    color: 'tomato',
    fontFamily: FONT.bold,
    fontSize: SIZE[18],
  },
});
