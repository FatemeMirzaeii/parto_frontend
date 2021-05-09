import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE, WIDTH } from '../../styles/static';
export default StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    // marginBottom: 53,
  },
  sky: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  codeFieldRoot: {
    marginVertical: 30,
    justifyContent: 'space-evenly',
    width: WIDTH * 0.6,
    alignSelf: 'center',
  },
  cell: {
    fontFamily: FONT.regular,
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    elevation: 2,
  },
  focusCell: {
    borderColor: COLOR.purple,
  },
  listItemText: {
    color: COLOR.listItemTxt,
    fontFamily: FONT.regular,
    fontSize: 12,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
  field: {
    //marginVertical: 5,
    padding: 20,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    color: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 32,
    fontSize: 14,
    padding: 8,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.medium,
    color: '#666666',
    fontSize: 12,
  },
});
