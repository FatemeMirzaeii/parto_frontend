import { StyleSheet } from 'react-native';
import { FONT, COLOR } from '../../styles/static';

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
  newQuestion: { flex: 1, backgroundColor: '#ffc9dc' },
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
});
