import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  // container: {
  //   backgroundColor: '#ffffff',
  //   elevation: 10,
  //   justifyContent: 'center',
  //   height: '80%',
  //   width: '90%',
  //   alignSelf: 'center',
  //   borderRadius: 25,
  //   top: '10%',
  // },
  // button: {
  //   alignSelf: 'center',
  //   bottom: -30,
  //   position: 'absolute',
  // },
  // close: {
  //   position: 'absolute',
  //   top: 15,
  //   left: 15,
  // },
  // error: {
  //   fontSize: 12,
  //   color: 'red',
  //   alignSelf: 'center',
  // },

  container: {
    backgroundColor: '#ffffff',
    paddingTop: 30,
    // elevation: 10,
    justifyContent: 'center',
    // height: '80%',
    // width: '90%',
    alignSelf: 'center',
    // borderRadius: 25,
    // top: '10%',
  },
  close: {
    position: 'absolute',
    top: 25,
    left: 15,
  },
  phoneInput: {
    // marginTop:6,
    // margin: 5,
    // marginLeft: 40,
    margin: 10,
    alignSelf: 'center',
    padding: 5,
    height: 50,
    width: 120,
    borderColor: '#9FE6FD',
    borderWidth: 1,
    fontSize: 15,
    fontFamily: FONT.regular,
  },
  phoneInputTxt: {
    fontFamily: FONT.regular,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH *0.6,
    height: 40,
    borderRadius: 40,
    alignSelf:'center'
  },
  button: {
    height: 40,
    backgroundColor: COLOR.btn,
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
  },
  codeFieldRoot: {
    marginTop: 20,
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
  },
  focusCell: {
    borderColor: '#000',
  },
});
