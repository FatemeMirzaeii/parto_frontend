import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, SIZE } from '../../styles/static';
export default StyleSheet.create({
  dayNames: { alignItems: 'center', justifyContent: 'center' },
  txt: {
    fontSize: SIZE[10],
    textAlign: 'center',
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
