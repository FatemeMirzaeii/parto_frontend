import { StyleSheet } from 'react-native';
import { FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: { flex: 1, paddingBottom: 53 },
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
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
});
