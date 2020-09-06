import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, SIZE } from '../../styles/static';
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
    borderWidth: 1,
    borderColor: '#f6f6f6',
    borderRadius: 40,
    width: WIDTH / 10,
    height: HEIGHT / 20,
  },
});
