import { StyleSheet } from 'react-native';
import { FONT,COLOR } from '../../styles/static';

export const HTMLTagsStyles = {
  h2: {
    textAlign: 'right',
    //color: 'lightblue',
   
    color:COLOR.tiffany,
    fontFamily: FONT.black,
    fontWeight: 'normal',
    margin: 3,
    paddingVertical:10
    
  },
  h3: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    paddingVertical: 10,
    fontWeight: 'normal',
    margin: 5,
    color:'black'
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
    margin:7,
    //padding:5,
    fontSize:16,
   // backgroundColor:'red'
   lineHeight:35,
   marginRight:20,
   //padding:10,
  },
  p: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin:7,
    //padding:5,
    fontSize:16,
   // backgroundColor:'red'
   lineHeight:35
    
  },
  span: {
    textAlign: 'right',
    fontFamily:FONT.regular,
    fontWeight: 'normal',
    margin: 5,
    //padding:5,
    fontSize:16,
   // backgroundColor:'red',
    lineHeight:35
  },
  strong: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
    fontSize:16,
    //padding:5,
    // color:'red',
    // backgroundColor:'red',
    lineHeight:35
  },
  ul: {
    direction: 'rtl',
   // backgroundColor:'yellow',
    margin:10,
  },
  li: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignSelf:'flex-end',
    //padding:5,
    //margin: 5,
    fontSize:16,
    //lineHeight:35,
    //backgroundColor:'lightgreen'

  },
  i: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignSelf:'flex-end',
    //padding:5,
    //margin: 5,
    fontSize:16,
    //lineHeight:35,
    //backgroundColor:'lightgreen',
    

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
  logosWrapper:{
    width:'80%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    alignSelf:'center',
    paddingBottom:50,
  },
  img:{
    width:90,
    height:90,
    borderRadius:20,
  },
  HTML: { width: '100%' },
  contentContiner: {
    padding: 10,
    flex: 1,
  },
});
