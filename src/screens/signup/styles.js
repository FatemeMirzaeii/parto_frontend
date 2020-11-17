import { StyleSheet } from 'react-native';
import { COLOR, FONT, SIZE } from '../../styles/static';

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
    paddingTop:30,
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
    margin:10,
    alignSelf: 'center',
    padding: 5,
    height: 50,
    width:120,
    borderColor: '#9FE6FD',
    borderWidth: 1,
    fontSize:15,
    fontFamily:FONT.regular
  },
  button: {
    alignSelf: 'center',
    bottom: -30,
    position: 'absolute',
  },
  close: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  title: {
    fontSize:SIZE[15],
    color: COLOR.black,
    alignSelf: 'center',
  },
});
