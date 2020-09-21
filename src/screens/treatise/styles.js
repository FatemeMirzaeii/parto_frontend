import { StyleSheet } from 'react-native';
import { FONT } from '../../styles/static';

export const HTMLTagsStyles = {
  h2: {
    textAlign: 'right',
    color: 'lightblue',
    fontFamily: FONT.black,
    fontWeight: 'normal',
    margin: 5,
  },
  h3: {
    textAlign: 'right',
    fontFamily: FONT.bold,
    paddingVertical: 10,
    fontWeight: 'normal',
    margin: 5,
  },
  h4: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
  },
  h5: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
  },
  p: {
    textAlign: 'right',
    fontFamily: FONT.light,
    fontWeight: 'normal',
    margin: 5,
  },
  span: {
    textAlign: 'right',
    fontFamily: FONT.light,
    fontWeight: 'normal',
    margin: 5,
  },
  div: {
    textAlign: 'right',
  },
  strong: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
  },
  ul: {
    direction: 'rtl',
  },
  li: {
    textAlign: 'right',
    fontFamily: FONT.light,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
};

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingBottom: 50,
    //paddingTop: 24,
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
    width: '95%',
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
    margin: 20,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    textAlign: 'right',
    fontFamily: FONT.medium,
  },
  icon: { fontSize: 18, color: 'black', padding: 10 },
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
  HTML: { width: '100%' },
  contentContiner: {
    padding: 10,
    flex: 1,
  },
});
