import { StyleSheet } from 'react-native';
import { FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
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
  listItemTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[16],
  },
  inputMessage:{
    elevation: 2,
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  }
});
