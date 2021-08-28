import { StyleSheet } from 'react-native';
import { COLOR, FONT, HEIGHT } from '../../styles/static';

export default StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 53,
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
    paddingBottom: 53,
    paddingTop: 3,
  },
  headerCotainer: {
    flex: 1,
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLOR.black,
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
  icon: { fontSize: 18, color: COLOR.pink, padding: 10 },
  imageHeader: {
    marginTop: 75,
    resizeMode: 'cover',
    flex: 1,
  },
  titleWrapper: {
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
    backgroundColor: COLOR.pink,
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
  contentContiner: {
    flex: 1,
    padding: 10,
  },
});
