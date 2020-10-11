import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingBottom: 50,
  },
  img: {
    width: WIDTH,
    height: HEIGHT / 4,
    // margin: 5,
  },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    margin: 3,
  },
  ideaButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    borderRadius: 40,
  },
  nextButton: {
    backgroundColor: COLOR.btn,
  },
  prevButton: {
    backgroundColor: '#ffffff',
    width: WIDTH / 3,
    borderRadius: 40,
  },

  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  darkBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
    color: COLOR.btn,
  },
  btnSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[12],
    color: COLOR.textColor,
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  GridViewTextLayout: {
    fontSize: 15,
    fontFamily: FONT.regular,
    justifyContent: 'center',
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  Title: {
    fontSize: 17,
    fontFamily: FONT.medium,
    justifyContent: 'center',
    color: 'black',
    paddingBottom: 5,
    textAlign: 'center',
  },
});
