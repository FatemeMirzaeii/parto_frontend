import { StyleSheet } from 'react-native';
import { WIDTH, HEIGHT, FONT, SIZE } from '../../styles/static';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  sky: {
    width: '100%',
    height: '100%',
    paddingTop: 25,
  },
  partnerFlatList: {
    backgroundColor: 'white',
    height: '75%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
  },

  parterOptions: {
    width: WIDTH / 1.21,
    height: HEIGHT / 7,
    margin: 12,
    elevation: 2,
    borderRadius: 14,
    alignSelf: 'center',
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZE[115],
    color: 'black',
    marginTop: -55,
    marginBottom: 20,
    marginRight: 85,
  },
  txt: {
    fontFamily: FONT.regular,
    fontSize: 15,
    color: 'gray',
    marginRight: 85,
    bottom: 5,
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginLeft: '50%',
  },
  icon: {
    marginTop: 32,
  },

  parterOptionsMultipleChoice2: {
    width: WIDTH / 1.21,
    height: HEIGHT / 5,
    margin: 12,
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 14,
  },
  titleMultipleChoice2: {
    fontFamily: FONT.medium,
    fontSize: SIZE[115],
    color: 'black',
    marginTop: -80,
    marginBottom: 10,
    marginRight: 85,
  },
  txtMultipleChoice2: {
    fontFamily: FONT.regular,
    fontSize: 15,
    color: 'gray',
    marginRight: 85,
    marginBottom: 20,
  },
  svg2: {
    width: '60%',
    height: '60%',
    marginHorizontal: 195,
    bottom: 130,
    margin: -10,
  },
  icon2: {
    marginTop: 50,
  },

  parterOptionsMultipleChoice3: {
    width: WIDTH / 1.21,
    height: HEIGHT / 4.1,
    margin: 12,
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 14,
  },
  titleMultipleChoice3: {
    fontFamily: FONT.medium,
    fontSize: SIZE[115],
    color: 'black',
    marginTop: -100,
    marginBottom: 10,
    marginRight: 85,
  },
  txtMultipleChoice3: {
    fontFamily: FONT.regular,
    fontSize: 15,
    color: 'gray',
    marginRight: 85,
    marginBottom: 15,
  },
  svg3: {
    width: 80,
    height: 80,
    marginHorizontal: 258,
    bottom: 172,
    margin: -10,
  },
  icon3: {
    marginTop: 70,
  },

  parterOptionsMultipleChoice4: {
    width: WIDTH / 1.21,
    height: HEIGHT / 3.6,
    margin: 12,
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 14,
  },
  titleMultipleChoice4: {
    fontFamily: FONT.medium,
    fontSize: SIZE[115],
    color: 'black',
    marginTop: -110,
    marginRight: 85,
  },
  txtMultipleChoice4: {
    fontFamily: FONT.regular,
    fontSize: 15,
    color: 'gray',
    marginRight: 85,
    marginBottom: 13,
  },
  svg4: {
    width: 70,
    height: 70,
    marginHorizontal: 260,
    margin: -10,
    bottom: 193,
  },
  icon4: {
    marginTop: 80,
  },
  img: {
    width: '98%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redIcon: {
    alignItems: 'flex-start',
  },
  htmlWrapper: {
    margin: 5,
  },
});

// line: {
//   // fontSize: 23,
//   // color: 'gray',
//   //transform:'' ,
//   // flexDirection: 'column',
//   flex: 1,
//   alignSelf: 'flex-end',
//   height: '100%',
//   width: 1.5,
//   backgroundColor: 'gray',
//   //width: '2%',
// },
