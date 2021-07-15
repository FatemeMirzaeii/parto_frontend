import { StyleSheet } from 'react-native';
import { FONT, COLOR, HEIGHT, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    marginBottom: 53,
  },
  wallet: { width: WIDTH / 1.2, alignSelf: 'center' },
  img: {
    width: WIDTH / 1.2,
    height: HEIGHT / 4.5,
    alignSelf: 'center',
  },
  credits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  headerTxt: { color: 'white', fontSize: 13 },
});
