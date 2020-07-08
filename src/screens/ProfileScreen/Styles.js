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
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[14],
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
});
