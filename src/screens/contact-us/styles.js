import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  img: {
    width: WIDTH,
    height: HEIGHT / 4,
    //margin: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  items: {
    height: HEIGHT / 3,
    width: WIDTH / 1.15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: { fontFamily: FONT.regular, fontSize: SIZE[14] },
});
