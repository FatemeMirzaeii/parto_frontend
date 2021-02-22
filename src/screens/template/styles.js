import { StyleSheet } from 'react-native';
import { COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEIGHT / 4.5,
    justifyContent: 'space-around',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
  },
  header: {
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
  },
  desc: {
    fontFamily: FONT.regular,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColor,
    lineHeight: 30,
    padding: 15,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 150,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  textContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: 200,
  },
  textbox: {
    elevation: 1,
    borderRadius: 30,
    width: 130,
  },
  button: {
    flexDirection: 'row-reverse',
    width: 100,
    alignSelf: 'flex-end',
    top: 25,
    marginBottom: 20,
  },
});
