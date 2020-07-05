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
    borderRadius: 15,
    width: Width / 3 - 10,
  },
  text: { alignSelf: 'center', fontFamily: Theme.fonts.regular },
  title: {
    margin: 10,
    paddingRight: 30,
    fontFamily: Theme.fonts.bold,
    //fontWeight: Theme.size[30],
  },
});
