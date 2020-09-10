import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: { height: '100%', backgroundColor: 'white' },
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    margin: 15,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    margin: 10,
    width: WIDTH / 3 - 15,
    height: HEIGHT / 5 - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderWidth: 6,
    borderRadius: 50,
  },
  options: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: SIZE[10],
    textAlign: 'center',
  },
  more: {
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[10],
    color: 'white',
  },
  input: {
    width: WIDTH / 1.5,
  },
  buttonGroup: {
    borderRadius: 10,
    alignSelf: 'center',
    height: 75,
    width: 50,
  },
});
