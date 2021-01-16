import { StyleSheet } from 'react-native';
import { COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  main: {
    //paddingBottom: 50,
    paddingTop: 24,
  },
  slider: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationContainer: {
    position: 'absolute',
    top: HEIGHT / 4,
    alignSelf: 'center',
  },
  paginationDots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLOR.pink,
  },
  inactiveDot: {
    backgroundColor: COLOR.pink,
  },
  safeAreaView: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: 3,
  },
  headerCotainer: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '90%',
  },
  headerText: {
    alignSelf: 'flex-end',
    color: 'black',
    fontSize: 17,
    fontFamily: FONT.medium,
  },
  titleStyle: {
    flex: 1,
    color: 'white',
    padding: 10,
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    textAlign: 'right',
    fontFamily: FONT.medium,
  },
  icon: { fontSize: 18, color: COLOR.btn, padding: 10 },
  imageHeader: {
    marginTop: 75,
    resizeMode: 'cover',
    flex: 1,
  },
  headerTitleWrapper: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  btnWrapper: {
    flex: 0.2,
    flexDirection: 'row-reverse',
  },
  categoryWrapper: {
    margin: 10,
    backgroundColor: COLOR.btn,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 40,
    marginRight: 25,
  },
  badge: {
    color: 'white',
    padding: 10,
    fontFamily: FONT.regular,
    alignItems: 'center',
  },
  HTML: {
    width: '100%',
  },
  contentContiner: {
    flex: 1,
    padding: 10,
  },
});
