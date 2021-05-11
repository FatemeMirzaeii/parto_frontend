import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE, WIDTH } from '../../styles/static';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  sky: {
    width: '100%',
    height: '100%',
  },
  codeFieldRoot: {
    marginVertical: 30,
    justifyContent: 'space-evenly',
    width: WIDTH * 0.4,
    alignSelf: 'center',
  },
  cell: {
    fontFamily: FONT.regular,
    color: 'white',
    width: 30,
    height: 30,
    lineHeight: 45,
    fontSize: 13,
    borderColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  icon: {
    marginTop: 40,
  },
  title: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: FONT.medium,
  },
  btnWrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    backgroundColor: COLOR.purple,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
});
