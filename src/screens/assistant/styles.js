import { StyleSheet } from 'react-native';
import { FONT, COLOR, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  newQuestionCont: {
    marginTop: -100,
    flex: 1,
    height: 10,
    zIndex: 2000000005,
  },
  newQuestion: { flex: 1, backgroundColor: 'rgba(173, 173, 173, 0.8)' },
  text: { fontFamily: FONT.regular },
  error: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  localScreen: (goftinoOpen) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: goftinoOpen ? 0 : 10,
  }),
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
    marginTop: 10,
    alignSelf: 'center',
  },
  button: {
    height: 40,
    backgroundColor: COLOR.btn,
  },
  dialogboxImg: { width: 150, height: 150, alignSelf: 'center' },
});
