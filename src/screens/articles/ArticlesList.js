import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'native-base';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import HTML from 'react-native-render-html';
import Share from 'react-native-share';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//components
import ArticleCard from '../../components/ArticleCard';
import SearchBar from '../../components/SearchBar';
import { FONT } from '../../styles/static';
const Articles = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  var shareTxt = '';
  const { catId } = route.params;

  useEffect(() => {
    const getCatArticle = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all`,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        // },
      })
        .then((res) => {
          console.log(res);
          setArticle(res.data.results);
          setData(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err, err.response);
          // if (err.response && err.response.data) {
          //   setServerError(err.response.data.message)
          // }
        });
    };

    getCatArticle();
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

  //console.log('catId',catId)

  return (
    <>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      {!isLoading && (
        <SafeAreaView style={{ flex: 1, paddingVertical: 15 }}>
          <SearchBar undertxt="جستجو" onChangeText={_handleSearch} />
          <View
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
          </View>
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
                image={item.avatar}
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

export default Articles;
