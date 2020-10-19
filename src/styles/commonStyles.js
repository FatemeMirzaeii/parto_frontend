import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE, COLOR } from './static';

export const HTMLTagsStyles = {
  h2: {
    textAlign: 'right',
    color: COLOR.tiffany,
    fontFamily: FONT.black,
    fontWeight: 'normal',
    margin: 3,
    paddingVertical: 10,
  },
  h3: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    paddingVertical: 10,
    fontWeight: 'normal',
    margin: 5,
    color: 'black',
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
  h6: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
    marginRight: 20,
  },
  p: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
  },
  span: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 5,
    fontSize: 16,
    lineHeight: 35,
  },
  strong: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
    fontSize: 16,
    lineHeight: 35,
  },
  ul: {
    direction: 'rtl',
    margin: 10,
  },
  li: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: 16,
  },
};
export default StyleSheet.create({
  helpTxt: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
  },
});
