import { StyleSheet } from 'react-native';
import { FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  divider: {
    height: 20,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: '#f1f1f1',
    elevation: 5,
  },
  avatarContainer: { flexDirection: 'row-reverse' },
  text: {
    marginLeft: 15,
    alignSelf: 'center',
    fontFamily: FONT.regular,
  },
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
