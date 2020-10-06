import { StyleSheet } from 'react-native';
import { WIDTH,HEIGHT, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.white },
  img: {
    width: WIDTH,
    height: HEIGHT / 4,
    margin: 5,
  },
  buttons: { flexDirection: 'row-reverse', justifyContent: 'space-around', margin: 3 },
  ideaButtonWrapper: { flexDirection: 'row', justifyContent: 'center',padding:20 },
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
});
