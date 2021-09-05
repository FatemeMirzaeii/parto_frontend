import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  //دست نخوره
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  container2: {
    height: '100%',
    backgroundColor: 'red',
  },
  //دست نخوره
  sky: {
    width: '100%',
    height: '100%',
    paddingTop: 25,
  },
  //اندازه ها تغییر نکنه ولی باید اسلایدر نباشه
  sliderWrapper: {
    backgroundColor: 'white',
    height: '75%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    //marginTop: 15,
  },
  partnerFlatList: {
    backgroundColor: 'white',
    height: '75%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    //marginTop: 15,
  },
  //استایلی که تو ظراحی خانم اسلامی طوسی کمرنگ مایل به سفیده مستطیلیه پایین تر از حالت بوردر کشیده شده
  sliderItem: {
    //flex: 1,
    height: '100%',
    alignItems: 'center',
    //padding: 10,
    //paddingBottom: 50,
    //backgroundColor: 'lightgreen',
  },
  // carousel: {
  //   flexDirection: 'row',
  //   // width: WIDTH / 1.6,
  //   // width: WIDTH /2,
  //   width: WIDTH * 0.95,
  //   marginVertical: '3%',
  //   height: HEIGHT / 5.7,
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   //backgroundColor: 'red',
  // },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // category: {
  //   //margin: '5%',
  //   marginBottom: '5%',
  //   //marginBottom: 13,
  //   width: WIDTH / 4,
  //   height: HEIGHT / 6.3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   //backgroundColor: '#aaa',
  //   backgroundColor: 'yellow',
  // },

  //large white
  // options1: {
  //   justifyContent: 'center',
  //   //alignItems: 'center',
  //   alignSelf: 'center',
  //   flex: 1,
  //   flexDirection: 'row',
  //   //marginTop: '5%',
  //   backgroundColor: 'pink',
  //   // margin:10,
  //   width: '100%',
  //   // height: HEIGHT /5,
  // },

  // white box option
  option1: {
    width: WIDTH / 1.21,
    height: HEIGHT / 7,
    flex: 1,
    margin: 5,
    alignSelf: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'yellow',
    elevation: 2,
    borderRadius: 14,
  },
  svgBox: {
    display: 'flex',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  svgOption: {
    //position: 'absolute',
    top: 15,
    left: 240,
    width: WIDTH / 4,
    height: HEIGHT / 10,
    //display: 'flex',
    //marginBottom: '5%',
    //marginBottom: 13,

    //width: '75%',
    //height: '75%',
  },
  descriptionTxt: {
    fontFamily: FONT.medium,
    fontSize: SIZE[16],
    textAlign: 'center',
    // margin: 5,
    // paddingVertical: 5,
  },
  // titleBox: {
  //   //width: '25%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   //paddingHorizontal: 10,
  //   alignItems: 'center',
  //   //backgroundColor:'yellow',
  //   alignSelf: 'center',
  //   //marginLeft: '10%',
  //   //backgroundColor: 'red',
  // },

  //استایل تایتل های کتگوری
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZE[15],
    //textAlign: 'center',
    //paddingRight: 10,
    color: 'red',
  },
  //استایل نوشته هر option مثلا انواع خونریزی
  txt: {
    fontFamily: FONT.regular,
    fontSize: 15,
    right: 95,
    bottom: 15,
    color: 'gray',
    //flex: 1,
    paddingHorizontal: 15,
    //backgroundColor:'green',
    //  alignItems:'center',
    //  alignSelf:'center',
    // marginBottom: 10,
  },

  more: {
    borderRadius: 15,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[10],
    color: 'white',
  },
  input: {
    width: WIDTH / 1.5,
  },
  buttonGroup: {
    borderRadius: 10,
    alignSelf: 'center',
    height: 75,
    width: 50,
    fontFamily: FONT.regular,
  },
  icon: {
    alignItems: 'flex-start',
  },
  htmlWrapper: {
    margin: 5,
  },
});
