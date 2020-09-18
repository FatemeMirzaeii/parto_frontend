import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
  saveButton: {
    elevation: 5,
    backgroundColor: COLOR.btn,
    marginTop: 30,
    width: WIDTH - 20,
    alignSelf: 'center',
  },
  saveContainer: {
    backgroundColor: COLOR.btn,
    borderWidth: 0,
    borderRadius: 40,
    alignSelf: 'center',
    width: '100%',
  },
  saveTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    color: COLOR.white,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
});
