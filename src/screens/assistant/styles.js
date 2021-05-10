import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
  listItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
});
