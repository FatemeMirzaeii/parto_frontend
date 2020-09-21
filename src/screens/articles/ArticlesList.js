import axios from 'axios';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import base64 from 'react-native-base64';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
//components
import ArticleCard from '../../components/ArticleCard';
import SearchBar from '../../components/SearchBar';
import { COLOR, FONT } from '../../styles/static';
const authCode = base64.encode('m.vosooghian:m.vosooghian');
const ArticlesList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  var shareTxt = '';
  const { catId } = route.params;

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
          //setCategoryContent(res.data.results);
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
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
                const data = response.data.results;
                const imgUrl = [];

                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `https://ketab.partobanoo.com${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );
                }
                article.push({
                  ...con[i],
                  cover: imgUrl[0],
                  images: imgUrl,
                  catId: catId,
                });
                //setArticle({...con[i],cover:imgUrl[0],images:imgUrl})
                // setCategoryContent(pre=>{...pre,cover:imgUrl[0],images:imgUrl})
                // setCategoryContent(prevState => {
                //   // Object.assign would also work
                //   return {...prevState ,cover:imgUrl[0],images:imgUrl};
                // });

                setIsLoading(false);
                setData(article);
              })
              .catch((err) => {
                console.error(err, err.response);
                // if (err.response && err.response.data) {
                //   setServerError(err.response.data.message)
                // }
              });
          }
          // setArticle(content);
        })

        .catch((err) => {
          console.error(err, err.response);
        });
    };
    getCategoryContent();
  }, [catId]);

  const _handleSearch = (text) => {
    setData(article);
    const result = article.filter((i) => {
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
            fontFamily: FONT.light,
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
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLOR.btn} />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1, paddingTop: 24, paddingBottom:50 }}>
          <SearchBar
            undertxt="جستجو"
            onChangeText={_handleSearch}
            iconColor={COLOR.btn}
          />
          {/* <View
            style={{
              // backgroundColor:'red',
              height: 50,
              flexDirection: 'row-reverse',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  type="Foundation"
                  name="filter"
                  style={{ fontSize: 30 }}
                />
                <Text
                  style={{ margin: 10, fontFamily: 'IRANSansMobile_Light' }}>
                  فیلتر
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => setSortVisible(true)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="sort"
                  style={{ fontSize: 30 }}
                />
                <Text
                  style={{ margin: 10, fontFamily: 'IRANSansMobile_Light' }}>
                  مرتب‌سازی
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}
          <Modal
            animationType="fade"
            isVisible={filterVisible}
            onRequestClose={() => setFilterVisible(false)}
            onBackdropPress={() => setFilterVisible(false)}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <TouchableOpacity onPress={() => setFilterVisible(false)}>
                  <Icon style={{ flex: 1 }} type="EvilIcons" name="close" />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: 20, fontFamily: 'IRANSansMobile_Light' }}>
                  جستجو براساس
                </Text>
              </View>
              <View
                style={{
                  //flex:1,
                  height: 3,
                  backgroundColor: '#f94309',
                }}
              />
              <Text
                style={{
                  margin: 10,
                  fontFamily: 'IRANSansMobile_Light',
                  textAlign: 'center',
                }}>
                خوانده شده
              </Text>

              <View
                style={{
                  height: 3,
                  backgroundColor: '#F2F3F4',
                }}
              />
              <TouchableHighlight>
                <Text
                  style={{
                    margin: 10,
                    fontFamily: 'IRANSansMobile_Light',
                    textAlign: 'center',
                  }}>
                  خوانده نشده
                </Text>
              </TouchableHighlight>
              <View
                style={{
                  height: 3,
                  backgroundColor: '#F2F3F4',
                }}
              />
              <TouchableHighlight onPress={() => setFilterVisible(false)}>
                <Text
                  style={{
                    margin: 10,
                    fontFamily: 'IRANSansMobile_Light',
                    textAlign: 'center',
                  }}>
                  پیشنهاد ویژه
                </Text>
              </TouchableHighlight>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            isVisible={sortVisible}
            onRequestClose={() => setSortVisible(false)}
            onBackdropPress={() => setSortVisible(false)}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <TouchableOpacity onPress={() => setSortVisible(false)}>
                  <Icon style={{}} type="EvilIcons" name="close" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontFamily: FONT.light }}>
                  مرتب‌سازی براساس
                </Text>
              </View>
              <View
                style={{
                  height: 3,
                  backgroundColor: '#f94309',
                }}
              />
              <TouchableHighlight>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ margin: 17, fontFamily: FONT.light }}>
                    بیشترین بازدید
                  </Text>
                </View>
              </TouchableHighlight>
              <View
                style={{
                  height: 3,

                  backgroundColor: '#F2F3F4',
                }}
              />
              <TouchableHighlight onPress={() => setSortVisible(false)}>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ margin: 17, fontFamily: FONT.light }}>
                    بیشترین امتیاز
                  </Text>
                  {/* <Image style={{ resizeMode: 'cover', width: 30, height: 30, marginRight: 15, marginTop: 15 }}
                  source={require('../../assets/images/podium.png')} /> */}
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ArticleCard
                name={item.title}
                image={
                  item.cover
                    ? item.cover
                    : 'https://ravandbazar.ir/wp-content/uploads/2020/04/%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%DA%A9%D8%B3.jpg'
                }
                onPress={() =>
                  navigation.navigate('ArticleDetails', {
                    articleContent: item,
                  })
                }
                // shareContent={_shareContent(item.body.storage.value.toString())}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={_renderListEmptyComponent}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default ArticlesList;
