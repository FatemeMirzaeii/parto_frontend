import { StyleSheet } from 'react-native';
import { WIDTH, FONT, SIZE, COLOR } from '../../styles/static';
export default StyleSheet.create({
  dayNames: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    right: 20,
  },
  txt: {
    fontSize: SIZE[10],
    textAlign: 'center',
    width: WIDTH / 8,
  },
  editableDays: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 0.7,
    borderColor: COLOR.bleeding,
    borderRadius: 40,
    width: 35,
    height: 35,
    fontFamily: FONT.medium,
  },
  bottomButton: {
    position: 'absolute',
    borderWidth: 0,
    marginBottom: 15,
    bottom: 25,
    justifyContent: 'center',
    width: 150,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLOR.pink,
  },
  buttonTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[12],
  },
  dialogBoxWrapper: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  dialogBoxDescription: {
    margin: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },

  dialogBoxTxt: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 12,
  },
  dialogBoxLine: (color) => ({
    width: 30,
    height: 14,
    borderRadius: 7,
    backgroundColor: color,
  }),
  dialogBoxIcon: {
    marginLeft: 5,
  },
  noteListWrapper: {
    width: WIDTH - 30,
    backgroundColor: '#F3F4F9',
    marginTop: 10,
    borderRadius: 10,
  },
  icon: {
    marginLeft: 10,
  },
  noteTitleBox: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 10,
  },
  noteBox: {
    height: 100,
    fontFamily: FONT.regular,
    fontSize: 12,
    width: WIDTH * 0.82,
  },
  row: {
    flexDirection: 'row',
  },
  btnSheetContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: 510,
  },
  btnSheetHeader: {
    backgroundColor: '#d1d1d1',
    width: 35,
    height: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  btnSheetTitle: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 16,
  },
  btnSheetCategory: {
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.listItemTxt,
  },
  btnSheetbuttonsBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  trackedlist: {
    marginTop: 5,
    height: 110,
  },
  SvgContainer: {
    backgroundColor: 'white',
    height: 80,
    borderRadius: 50,
  },
  indexBox: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indexTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FONT.medium,
    color: COLOR.listItemTxt,
    fontSize: 12,
    marginHorizontal: 5,
  },
  emptyTxt: {
    fontFamily: FONT.medium,
    color: COLOR.listItemTxt,
    fontSize: 12,
    padding: 20,
  },
  index: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30,
  },
  noteslist: {
    marginTop: 5,
    height: 180,
  },
});
