import { StyleSheet } from 'react-native';
import { COLOR, FONT, WIDTH } from '../../styles/static';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  sky: {
    width: '100%',
    height: '100%',
  },
  codeFieldRoot: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: WIDTH * 0.5,
    alignSelf: 'center',
  },
  cell: {
    fontFamily: FONT.regular,
    color: 'white',
    width: 40,
    height: 40,
    lineHeight: 45,
    fontSize: 18,
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon: {
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: FONT.medium,
    marginBottom: 20,
  },
  btnWrapper: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH,
  },
  btnContainer: {
    elevation: 3,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    height: 40,
    backgroundColor: COLOR.purple,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: 14,
  },
  buttonNext: {
    height: 40,
    backgroundColor: 'white',
  },
  btnTitleNext: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLOR.purple,
  },

  phoneContainer: {
    //backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 30,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: '#969696',
    textAlign: 'center',
  },

  phoneInputwrapper: {
    width: WIDTH * 0.7,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 30,
  },
  phoneInputTxtwrapper: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -10,
  },
  phoneInputTxt: {
    fontFamily: FONT.regular,
  },
});
