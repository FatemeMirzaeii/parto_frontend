import { StyleSheet } from 'react-native';
import { COLOR, FONT, WIDTH } from '../../styles/static';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingBottom: 53,
  },
  icon: { fontSize: 18, color: 'black', padding: 10 },
  logosWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  contentContiner: {
    padding: 10,
    flex: 1,
  },
  main: {
    paddingBottom: 53,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#f9d1de',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '50%',
    padding: '5%',
    margin: 5,
    borderRadius: 15,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    flex: 0.95,
    fontSize: 14,
    fontFamily: FONT.medium,
    paddingHorizontal: '5%',
  },
  dropIcon: {
    fontSize: 30,
    color: COLOR.btn,
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  GridViewTextLayout: {
    fontSize: 15,
    fontFamily: FONT.medium,
    justifyContent: 'center',
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  helpTxt: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
  },
  imageContainer: {
    flex: 1,
    height: '69%',
    width: WIDTH - 15,
    marginVertical: -80,
    marginTop: 37,
  },
  image: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
});
