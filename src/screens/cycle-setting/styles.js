import { StyleSheet } from 'react-native';
import { COLOR, FONT } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: { flex: 1, paddingBottom: 53 },
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
  listItemText: {
    color: COLOR.listItemTxt,
    fontFamily: FONT.regular,
    fontSize: 12,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
});
