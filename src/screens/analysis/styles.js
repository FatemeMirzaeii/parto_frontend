import { StyleSheet } from 'react-native';
import { COLOR, HEIGHT, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noticeContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  bg: {
    backgroundColor: COLOR.white,
  },
  circleContainer: { alignItems: 'center' },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 60,
    elevation: 2,
    backgroundColor: COLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
  },
});
