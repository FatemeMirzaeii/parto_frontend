import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: 25,
  },
  sliderItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    margin: '7%',
    marginBottom: 13,
    width: WIDTH / 4,
    height: HEIGHT / 6.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
  },
  option: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  icon: {
    width: WIDTH / 4.2,
    height: HEIGHT / 7.6,
    borderWidth: 6,
    borderRadius: 25,
  },
  descriptionTxt: {
    fontFamily: FONT.medium,
    fontSize: SIZE[17],
    textAlign: 'center',
    margin: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZE[15],
    textAlign: 'center',
    paddingBottom: '10%',
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    textAlign: 'center',
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
    fontFamily: FONT.regular,
  },
});
