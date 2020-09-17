import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, SIZE, COLOR } from '../../styles/static';
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
});
