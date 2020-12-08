import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  codeBox: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 2,
    borderRadius: 20,
    width: WIDTH - 50,
    height: 125,
    backgroundColor: COLOR.white,
  },
  title: { fontFamily: FONT.regular, fontSize: SIZE[14] },
  code: { fontFamily: FONT.bold, fontSize: SIZE[21] },
});
