import { StyleSheet } from 'react-native';
import { FONT, SIZE,WIDTH,COLOR } from '../../styles/static';

export default StyleSheet.create({
//   container: {
//     backgroundColor: '#ffffff',
//     elevation: 10,
//     justifyContent: 'center',
//     height: '80%',
//     width: '90%',
//     alignSelf: 'center',
//     borderRadius: 25,
//     top: '10%',
//   },
//   button: {
//     alignSelf: 'center',
//     bottom: -30,
//     position: 'absolute',
//   },
//   //input: { flexDirection: 'row-reverse', backgroundColor: 'red' },
//   btnTitle:{
//     fontFamily: FONT.medium,
//     fontSize: SIZE[14],
//   },
//   login: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: 100,
//     flexDirection: 'row-reverse',
//   },
//   close: {
//     position: 'absolute',
//     top: 15,
//     left: 15,
//   },
//   error: {
//     fontSize: 12,
//     color: 'red',
//     alignSelf: 'center',
//   },
// });
close: {
      position: 'absolute',
      top: 25,
      left: 15,
    },
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
  alignSelf:'center',
  margin:5
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
});
