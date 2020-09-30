import { StyleSheet } from 'react-native';
import { COLOR } from '../../styles/static';

export default StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: COLOR.textColor,
    margin: 20,
    marginTop: -130,
    lineHeight: 20,
  },
});
