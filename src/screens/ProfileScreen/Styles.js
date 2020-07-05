import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../app/Theme';

export default StyleSheet.create({
  goals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  goal: {
    backgroundColor: 'transparent',
    //borderWidth: 0,
    borderRadius: 30,
    width: Width / 1.1,
  },
  text: {
    alignSelf: 'center',
    fontFamily: Theme.fonts.regular,
    //fontWeight: Theme.size[15],
  },
  title: {
    margin: 10,
    paddingRight: 30,
    fontFamily: Theme.fonts.bold,
    //fontWeight: Theme.size[30],
  },
});
