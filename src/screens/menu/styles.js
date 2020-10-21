import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginBottom: 50,
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
  goals: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: WIDTH / 1.2,
    height: 26,
    flexDirection: 'row-reverse',
  },
  goal: { borderRadius: 50 },
  title: {
    margin: 10,
    paddingRight: 10,
    fontFamily: FONT.bold,
    fontSize: SIZE[21],
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
  },
});
