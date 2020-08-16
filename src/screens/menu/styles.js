import { StyleSheet } from 'react-native';
import { Theme } from '../../styles/Theme';

export default StyleSheet.create({
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
    fontFamily: Theme.fonts.regular,
  },
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
