import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
  listItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
  newQuestionCont: (hasEnaughCredit) => ({
    marginTop: hasEnaughCredit ? 0 : -100,
    flex: hasEnaughCredit ? 0 : 1,
    height: hasEnaughCredit ? 0 : 10,
  }),
  newQuestion: { flex: 1, backgroundColor: '#ffc9dc' },
});
