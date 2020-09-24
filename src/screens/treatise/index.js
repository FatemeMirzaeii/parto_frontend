import axios from 'axios';
import { Icon } from 'native-base';
import { Icon as IconElement } from 'react-native-elements';
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
import base64 from 'react-native-base64';
import { FloatingAction } from 'react-native-floating-action';
import { COLOR, FONT } from '../../styles/static';
const authCode = base64.encode('m.vosooghian:m.vosooghian');

const Treatise = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
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
      headerTitleStyle: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 17,
        fontFamily: FONT.medium,
      },
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
        url: `https://ketab.partobanoo.com/rest/api/search?os_authType=basic&cql=(space.key=ahkam and type=page and label= "دسته‌بندی")order by created desc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.results);
          setCategoryList(res.data.results);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getCategoryList();
  }, []);

  const _onPressFloatingActionItem = (name) => {
    if (name === 'call') Linking.openURL(`tel:${'+'}${985132020}`);
    if (name === 'SMS') Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`);
    if (name === 'help') navigation.navigate('TreatiseHelp');
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.main}>
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
                  <Icon type="Fontisto" name="blood-drop" style={styles.icon} />
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FloatingAction
          actions={actions}
          color={COLOR.btn}
          //overlayColor={COLOR.lightPink}
          onPressItem={_onPressFloatingActionItem}
        />
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
    padding: 10,
  },
  button: {
    backgroundColor: '#f4e0e1',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 5,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    fontFamily: FONT.medium,
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 30,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Treatise;
