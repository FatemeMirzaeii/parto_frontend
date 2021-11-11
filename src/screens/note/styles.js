import { StyleSheet } from 'react-native';
import { FONT, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 10,
  },
  centeredRow: { flexDirection: 'row-reverse', justifyContent: 'center' },
  icon: {
    right: 40,
  },
  btnContainer: {
    elevation: 3,
    width: 100,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    height: 40,
    backgroundColor: COLOR.pink,
  },
  btnTitle: {
    color: COLOR.white,
    fontFamily: FONT.medium,
    fontSize: 14,
  },
  content: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: 'black',
  },
  contentCont: {
    minHeight: 200,
    fontFamily: FONT.regular,
    borderTopWidth: 0.9,
    borderTopColor: COLOR.icon,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  dayText: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 16,
    minWidth: 100,
  },
  dateCont: {
    borderRadius: 100,
    height: 40,
    backgroundColor: 'rgba(246, 246, 246, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    alignSelf: 'center',
    width: 150,
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: 14,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: COLOR.pink,
  },
});
