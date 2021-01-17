import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE, COLOR } from '../../styles/static';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    //justifyContent: 'space-between',
    //paddingTop: 25,
    // flex:1,
  },
  sky: {
    width: '100%',
    height: '100%',
    // justifyContent:'flex-end'
    // flex:1,
    //justifyContent: 'space-around',
  },

  sliderWrapper: {
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 5,
  },
  sliderItem: {
    //flex: 1,
    height: '100%',
    alignItems: 'center',
    //
    padding: 10,
    //paddingBottom: 50,
    //backgroundColor:'lightgreen'
  },
  carousel: {
    flexDirection: 'row',
    width: WIDTH / 1.6,
    // width: WIDTH /2,
    marginTop: 10,
    height: HEIGHT / 4.5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    //backgroundColor:"red"
  },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    //margin: '5%',
    marginBottom: '5%',
    //marginBottom: 13,
    width: WIDTH / 4,
    height: HEIGHT / 6.3,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#aaa'
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    //marginTop: '5%',
    // backgroundColor:'pink',
    // margin:10,
    width: '70%',
    // height: HEIGHT /5,
  },
  option: {
    width: WIDTH / 3,
    height: HEIGHT / 6,
    flex: 1,
    margin: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow',
    elevation: 3,
    borderRadius: 25,
  },
  icon: {
    width: WIDTH / 4.2,
    height: HEIGHT / 7.6,

    // elevation: 3,
    //backgroundColor:'red'
  },
  descriptionTxt: {
    fontFamily: FONT.medium,
    fontSize: SIZE[16],
    textAlign: 'center',
    // margin: 5,
    // paddingVertical: 5,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    alignItems: 'center',
    //backgroundColor:'yellow',
    alignSelf: 'center',
    marginLeft: '30%',
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZE[15],
    textAlign: 'right',
    //paddingBottom: '10%',
    paddingRight: '20%',
    //backgroundColor:'green'
  },
  txt: {
    fontFamily: FONT.medium,
    fontSize: 11,
    textAlign: 'center',
    color: COLOR.black,
    flex: 1,
    paddingHorizontal: 5,
    //backgroundColor:'green',
    //  alignItems:'center',
    //  alignSelf:'center',
    //  marginBottom:10
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
});
