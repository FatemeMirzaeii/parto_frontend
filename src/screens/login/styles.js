import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    elevation: 10,
    justifyContent: 'center',
    height: '80%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 25,
    top: '10%',
  },
  button: {
    alignSelf: 'center',
    bottom: -30,
    position: 'absolute',
  },
  //input: { flexDirection: 'row-reverse', backgroundColor: 'red' },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    flexDirection: 'row-reverse',
  },
  close: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  error: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
  },
});
