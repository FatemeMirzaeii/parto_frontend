import { StyleSheet } from 'react-native';
import { FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  // text: {
  //   marginLeft: 15,
  //   alignSelf: 'center',
  //   fontFamily: Theme.fonts.regular,
  // },
  btnContainer: {
    elevation: 3,
    width: 100,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.pink,
  },
  btnTitle: {
    color: COLOR.white,
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  inputMessage: {
    elevation: 2,
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
  },
});
