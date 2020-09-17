import { StyleSheet } from 'react-native';
import { FONT } from '../../styles/static';

export const HTMLTagsStyles = {
  h2: {
    textAlign: 'right',
    color: 'lightblue',
    fontFamily: FONT.bold,
  },
  p: { textAlign: 'right', fontFamily: FONT.light },
  span: { textAlign: 'right', fontFamily: FONT.light },
  h3: {
    textAlign: 'right',
    fontFamily: FONT.black,
    paddingVertical: 10,
  },
  h4: {
    textAlign: 'right',
    fontFamily: FONT.medium,
  },
  h5: {
    textAlign: 'right',
    fontFamily: FONT.medium,
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
  div: {
    textAlign: 'right',
    fontFamily: FONT.light,
  },
};

export default StyleSheet.create({
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
