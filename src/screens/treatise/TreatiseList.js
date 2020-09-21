import axios from 'axios';
import { Icon } from 'native-base';
import { Icon as IconElement } from 'react-native-elements';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import base64 from 'react-native-base64';
import Share from 'react-native-share';
import SearchBar from '../../components/SearchBar';
import { COLOR, FONT } from '../../styles/static';
const authCode = base64.encode('m.vosooghian:m.vosooghian');
const txt1 =
  'محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا محتوا  ';
const TreatiseList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [rule, setRule] = useState([]);
  //const [shareTxt, setShareTxt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  var shareTxt = '';
  const { catId, catTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: catTitle,
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
    const getCategoryContent = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          let con = [];
          console.log(res);
          console.log('categoryContent', res.data.results);
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            console.log(res.data.results[i].id);
            axios({
              method: 'get',
              url: `https://ketab.partobanoo.com/rest/api/content/${res.data.results[i].id}/child/attachment`,
              headers: {
                Authorization: 'Basic ' + authCode,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'X-Atlassian-Token': 'no-check',
              },
            })
              .then((response) => {
                console.log('response', response);
                const data = response.data.results;
                const imgUrl = [];
                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `https://ketab.partobanoo.com${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );

                  console.log('imgUrl', imgUrl);
                }
                rule.push({
                  ...con[i],
                  cover: imgUrl[0],
                  images: imgUrl,
                  catId: catId,
                });
                setIsLoading(false);
                setData(rule);
                console.log('imgUrl', imgUrl);
                console.log('new', rule);
              })
              .catch((err) => {
                console.error(err, err.response);
                // if (err.response && err.response.data) {
                //   setServerError(err.response.data.message)
                // }
              });
          }
        })

        .catch((err) => {
          console.error(err, err.response);
        });
    };
    getCategoryContent();
  }, [catId]);

  const _handleSearch = (text) => {
    setData(rule);
    const result = rule.filter((i) => {
      return i.title.includes(text);
    });
    console.log('result', result);
    setData(result);
  };

  const _renderListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 30,
        }}>
        <Text
          style={{
            marginTop: 5,
            fontFamily: 'IRANSansMobile_Light',
            color: 'grey',
          }}>
          {' '}
          متاسفم! جستجو نتیجه‌ای نداشت.
        </Text>
        <Icon type="Entypo" name="emoji-sad" style={{ color: 'grey' }} />
      </View>
    );
  };

  const _shareContent = async (url) => {
    const shareOptions = {
      title: 'Share file',
      url: url,
      //url: images.image1,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      shareTxt = JSON.stringify(ShareResponse, null, 2);
    } catch (error) {
      console.log('Error =>', error);
      shareTxt = 'error: '.concat(getErrorString(error));
    }
  };

  return (
    <>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLOR.btn} />
        </View>
      )}
      {!isLoading && (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, paddingBottom: 50 }}>
          <SearchBar
            undertxt="جستجو"
            onChangeText={_handleSearch}
            iconColor={COLOR.btn}
          />
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={_renderListEmptyComponent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.GridViewContainer}
                onPress={() =>
                  navigation.navigate('TreatiseDetails', {
                    treatiseContent: item,
                  })
                }>
                {/* <LinearGradient
                  colors={['#48c5c6', '#66cecf', '#93dddd','#c0ebeb','#edf9f9','#f7f7f7','#edf9f9','#faf4f4','#fdf1f1','#ffefef','#f7dede','#f4e0e1']}
                  style={styles.linearGradient}
                  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                  
                  > */}
                <Text style={styles.GridViewTextLayout}> {item.title}</Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  GridViewTextLayout: {
    fontSize: 15,
    fontFamily: FONT.medium,
    justifyContent: 'center',
    color: 'black',
    padding: 10,
  },
  linearGradient: {
    height: 180,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TreatiseList;
