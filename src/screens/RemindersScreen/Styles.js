import { StyleSheet } from 'react-native';
import { Theme, Width, Height } from '../../app/Theme';

export default StyleSheet.create({
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
  listItemText: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[14],
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
});
