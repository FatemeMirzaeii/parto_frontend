import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR } from '../../styles/static';
export default StyleSheet.create({
  dayNames: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    right: 20,
  },
  txt: {
    fontSize: SIZE[10],
    textAlign: 'center',
    width: WIDTH / 8,
  },
  editableDays: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 0.7,
    borderColor: COLOR.btn,
    borderRadius: 40,
    width: 35,
    height: 35,
  },
  bottomButton: {
    position: 'absolute',
    borderWidth: 0,
    marginBottom: 15,
    bottom: 25,
    justifyContent: 'center',
    width: 150,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLOR.btn,
  },
  buttonTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
  },
});
