import { StyleSheet } from 'react-native';
import { FONT, SIZE, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginBottom: 53,
  },
  containerBtnItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BtnItem: {
    height: 80,
    justifyContent: 'space-around',
  },
  divider: {
    height: 20,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  avatar: {},
  avatarContainer: { flexDirection: 'row-reverse' },
  listItemText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    textAlign: 'center',
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
  titleContainer: {
    paddingLeft: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    paddingRight: 10,
    fontFamily: FONT.medium,
    fontSize: 12,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 12,
  },
});
