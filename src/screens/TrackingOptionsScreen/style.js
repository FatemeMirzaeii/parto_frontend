import {StyleSheet} from 'react-native';
import {Theme, Width, Height} from '../../app/Theme';

export default StyleSheet.create({
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: Width / 3 - 15,
    height: Height / 5 - 10,
    borderRadius: 20,
    borderWidth: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  txt: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[15],
    textAlign: 'center',
  },
  more: {
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[10],
    color: 'white',
  },
  input: {
    width: Width / 1.5,
  },
  buttonGroup: {
    borderRadius: 10,
    alignSelf: 'center',
    height: 75,
    width: 50,
  },
});
