import { StyleSheet } from 'react-native';
import { FONT, COLOR, HEIGHT, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    marginBottom: 53,
  },
  img: {
    width: WIDTH / 1.2,
    height: HEIGHT / 4.5,
    alignSelf: 'center',
  },
  coin: { width: 45, height: 45 },
  credits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditBox: {
    borderRadius: 100,
    elevation: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  packages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
