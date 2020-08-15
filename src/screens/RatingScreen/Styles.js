import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../app/Theme';

export default StyleSheet.create({
  goals: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: Width / 1.2,
    height: 26,
  },
  goal: { borderRadius: 50 },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[12],
  },
  listItem: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[14],
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
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.size[24],
  },
  picker: { alignItems: 'center' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  register: {
    backgroundColor: 'tomato',
    borderRadius: 25,
    width: Width / 1.1,
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
    width: Width / 1.1,
    alignSelf: 'center',
    margin: 10,
  },
  saveTitle: {
    color: 'tomato',
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.size[18],
  },
});
