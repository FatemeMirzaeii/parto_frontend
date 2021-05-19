import { StyleSheet } from 'react-native';
import { FONT, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  newQuestionCont: (hasEnaughCredit) => ({
    marginTop: hasEnaughCredit ? 0 : -100,
    flex: hasEnaughCredit ? 0 : 1,
    height: hasEnaughCredit ? 0 : 10,
  }),
  newQuestion: { flex: 1, backgroundColor: '#ffc9dc' },
  text: { fontFamily: FONT.regular },
});
