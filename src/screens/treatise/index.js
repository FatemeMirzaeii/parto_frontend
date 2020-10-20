import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'native-base';
import { Icon as IconElement } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
//import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';
// export const WIDTH = Math.round(Dimensions.get('window').width);
import { COLOR, FONT, WIDTH } from '../../styles/static';

const Treatise = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const actions = [
    {
      //text: 'تماس با کارشناس',
      icon: (
        <Icon
          type="MaterialIcons"
          name="call"
          style={styles.actionButtonIcon}
        />
      ),
      name: 'call',
      position: 1,
      color: COLOR.tiffany,
      textStyle: { fontFamily: 'IRANSansMobile(FaNum)_Medium' },
    },
    {
      //text: 'ارسال پیامک',
      icon: (
        <Icon type="FontAwesome5" name="sms" style={styles.actionButtonIcon} />
      ),
      name: 'SMS',
      position: 2,
      color: COLOR.tiffany,
    },
    {
      //text: 'راهنما',
      icon: (
        <Icon
          type="MaterialIcons"
          name="help"
          style={styles.actionButtonIcon}
        />
      ),
      name: 'help',
      position: 3,
      color: COLOR.tiffany,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'احکام',
      headerLeft: () => null,
      headerRight: () => (
        <IconElement
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  });

  useEffect(() => {
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/search?os_authType=basic&cql=(space.key=ahkam and type=page and label= "دسته‌بندی")order by created asc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.results);
          setCategoryList(res.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error, error);
          console.log('err', error);
          setServerError(error.toString());
          //console.log('err.response.data.message',err.response);
          setIsLoading(false);
        });
    };

    getCategoryList();
  }, []);

  const _onPressFloatingActionItem = (name) => {
    if (name === 'call') Linking.openURL(`tel:${'+985132020'}`);
    if (name === 'SMS') Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`);
    if (name === 'help') navigation.navigate('TreatiseHelp');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* {serverError && (
        
          <Error message={serverError} />
        
      )} */}
      <View style={styles.iconContainer}>
        <IconElement
          reverse
          size={25}
          name="call"
          type="MaterialIcons"
          color={COLOR.btn}
          onPress={() => Linking.openURL(`tel:${'+985132020'}`)}
        />
        <IconElement
          reverse
          size={25}
          type="FontAwesome5"
          name="sms"
          color={COLOR.btn}
          onPress={() => Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`)}
        />
        <IconElement
          reverse
          size={25}
          type="MaterialIcons"
          name="help"
          color={COLOR.btn}
          style={{ elevation: 6 }}
          onPress={() => navigation.navigate('TreatiseHelp')}
        />
      </View>
      <View style={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {categoryList && (
              <FlatList
                data={categoryList}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('TreatiseList', {
                        catId: item.content.id,
                        catTitle: item.title,
                      })
                    }>
                    <View style={styles.buttonContent}>
                      <Text style={styles.txt}>{item.title}</Text>
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 60,
                          backgroundColor: '#86dbd4',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          type="Fontisto"
                          name="blood-drop"
                          style={styles.icon}
                        />
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </>
        )}
        {/* <FloatingAction
          actions={actions}
          color={COLOR.btn}
          //overlayColor={COLOR.lightPink}
          buttonSize={50}
          onPressItem={_onPressFloatingActionItem}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingBottom: 50,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 10,
  },
  button: {
    backgroundColor: '#f9d1de',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '90%',
    // height:'50%',
    padding: '5%',
    // borderTopLeftRadius: 20,
    // borderBottomRightRadius: 20,
    margin: 5,
    borderRadius: 15,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:'red'
  },
  txt: {
    flex: 0.95,
    fontSize: 14,
    fontFamily: FONT.medium,
    paddingHorizontal: '5%',
  },
  icon: {
    fontSize: 30,
    color: '#ec5f91',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  iconContainer: {
    width: '65%',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    // padding:10,
    paddingTop: 20,
  },
});

export default Treatise;
