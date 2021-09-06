import { StyleSheet } from 'react-native';
import { COLOR, FONT, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginBottom: 53,
  },
  squareItemsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  divider: {
    height: 20,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  avatar: {},
  avatarContainer: { flexDirection: 'row-reverse' },
  goals: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: WIDTH * 0.9,
    height: 50,
    //backgroundColor:'yellow',
    flexDirection: 'row-reverse',
  },
  goal: {
    borderRadius: 50,
    margin: 5,
    borderWidth: 2,
    borderColor: COLOR.purple,
  },
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
    color: '#666666',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.medium,
    color: '#666666',
    fontSize: 12,
  },
});
