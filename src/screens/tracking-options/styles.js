import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  sliderItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEIGHT / 1.5,
  },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    margin: 10,
    width: WIDTH / 4,
    height: HEIGHT / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  option: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: WIDTH / 4,
    height: HEIGHT / 7,
    borderWidth: 6,
    borderRadius: 25,
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    textAlign: 'center',
    margin: 5,
  },
  more: {
    borderRadius: 15,
    padding: 6,
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
