import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE, WIDTH, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  main: {
    flex: 1,
    //backgroundColor: '#aaa',
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bg: {
    // flex:1,
    width: '100%',
    height: '100%',
  },
  container: {
    //backgroundColor: 'red',
    width: '70%',
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    color: '#969696',
    textAlign: 'center',
  },

  close: {
    position: 'absolute',
    top: 25,
    left: 15,
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
    color: COLOR.black,
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
