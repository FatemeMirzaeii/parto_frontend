import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ToastAndroid } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//redux
import { useSelector } from 'react-redux';

//components
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/Loader';
import NewestArticles from '../../components/NewestArticles';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { WIDTH } from '../../styles/static';
import styles from './styles';

const Articles = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [newest, setNewest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newestIsLoading, setNewestIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(4);
  const [spaceKey, setSpaceKey] = useState('');
  const modeState = useSelector((state) => state.user.template);
  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const initialize = async () => {
      switch (modeState) {
        case 'Main':
          return setSpaceKey('appcontent');
        case 'Teenager':
          return setSpaceKey('teenager');
        case 'Partner':
          return setSpaceKey('HusbandContent');
      }
    };
    initialize();
  }, [modeState]);

  useEffect(() => {
    let isCancelled = false;
    const getCategoryList = async () => {
      try {
        const res = await axios({
          method: 'get',
          //url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "دسته‌بندی")order by created asc`,
          url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=${spaceKey} and type=page and label= "دسته‌بندی")order by created asc`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        if (!isCancelled) {
          setCategoryList(res.data.results);
        }
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        }
      }
      setIsLoading(false);
    };
    if (spaceKey) {
      getCategoryList();
    }
    return () => {
      isCancelled = true;
    };
  }, [spaceKey, newest]);

  useEffect(() => {
    let isCancelled = false;
    const getNewList = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=${spaceKey} and type=page and label= "مقاله")order by created desc&start=${0}&limit=${5}`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        let con = [];
        let temp = [];
        let temp1 = [];
        //console.log('getNewList', res);
        setNewList(res.data.results);
        con = res.data.results;
        for (let i = 0; i < con.length; i++) {
          try {
            const result = await axios({
              method: 'get',
              url: `${articlesBaseUrl}/rest/api/content/${con[i].content.id}?expand=ancestors`,
              headers: {
                Authorization: 'Basic ' + authCode,
                'X-Atlassian-Token': 'no-check',
              },
            });

            //console.log('resParent', result.data.ancestors);
            temp1 = result.data.ancestors;
          } catch (err) {
            console.error(err, err.response);
            if (err.toString() === 'Error: Network Error') {
              ToastAndroid.show(
                'لطفا اتصال اینترنت رو چک کن.',
                ToastAndroid.LONG,
              );
            }
          }
          try {
            const response = await axios({
              method: 'get',
              url: `${articlesBaseUrl}/rest/api/content/${con[i].content.id}/child/attachment`,
              headers: {
                Authorization: 'Basic ' + authCode,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'X-Atlassian-Token': 'no-check',
              },
            });
            //console.log('response', response);
            const data = response.data.results;
            const imgUrl = [];
            for (let j = 0; j < data.length; j++) {
              imgUrl.push(
                `${articlesBaseUrl}${
                  data[j]._links.download.split('?')[0]
                }?os_authType=basic`,
              );
            }
            temp[i] = {
              ...con[i],
              cover: imgUrl[0],
              image: imgUrl,
              catName: temp1[3].title,
              catId: temp1[3].id,
              id: con[i].content.id,
            };
            if (!isCancelled) {
              setNewest(temp);
            }
            //console.log('setNewest', temp);
          } catch (err) {
            console.error(err, err.response);
            if (err.toString() === 'Error: Network Error') {
              ToastAndroid.show(
                'لطفا اتصال اینترنت رو چک کن.',
                ToastAndroid.LONG,
              );
            }
          }
        }
      } catch (err) {
        console.error(err, err.response);
      }
      setNewestIsLoading(false);
    };
    if (spaceKey) {
      getNewList();
    }
    return () => {
      isCancelled = true;
    };
  }, [spaceKey]);

  return (
    <>
      {isLoading && newestIsLoading ? (
        counter.map((item) => (
          <Loader key={item.toString()} type="ArticleLoader" />
        ))
      ) : (
        <SafeAreaView style={styles.main}>
          <FlatList
            ListHeaderComponent={
              <>
                <Carousel
                  slideStyle={styles.slider}
                  autoplay
                  inverted
                  data={newest}
                  onSnapToItem={(index) => setActiveSlide(4 - index)}
                  renderItem={({ item, index }) => (
                    <NewestArticles
                      title={item.content.title}
                      image={item.cover}
                      onSelectArticle={() => {
                        navigation.navigate('ArticleDetails', {
                          articleContent: item,
                          catName: item.catName,
                        });
                      }}
                    />
                  )}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH - 65}
                />
                <Pagination
                  dotsLength={newList.length}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.paginationDots}
                  inactiveDotStyle={styles.inactiveDot}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </>
            }
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryList
                moreBtn
                navigation={navigation}
                catId={item.content.id}
                catName={item.title}
                buttonTitle="مشاهده همه"
                category={item.title}
                MoreBtnOnPress={() => {
                  navigation.navigate('ArticlesList', {
                    catId: item.content.id,
                    catName: item.title,
                  });
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Articles;
