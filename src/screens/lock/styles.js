import { StyleSheet } from 'react-native';
import { COLOR, FONT, WIDTH, SIZE } from '../../styles/static';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    right: 40,
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
    padding: 20,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.medium,
    color: '#666666',
    fontSize: 12,
  },
  btnContainer: {
    elevation: 3,
    width: 150,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 30,
  },
  button: {
    height: 40,
    //backgroundColor: '#4c569c',
    backgroundColor: COLOR.purple,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  title: {
    fontSize: SIZE[15],
    color: COLOR.listItemTxt,
    alignSelf: 'center',
    fontFamily: FONT.medium,
    marginTop: '7%',
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
});
