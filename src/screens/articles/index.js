import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ToastAndroid } from 'react-native';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//components
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/Loader';
import NewestArticles from '../../components/NewestArticles';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { COLOR, FONT, SIZE, WIDTH } from '../../styles/static';

const Articles = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(4);
  const { navigation } = props;
  useEffect(() => {
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "دسته‌بندی")order by created asc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          setCategoryList(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err, err.response);
          setIsLoading(false);
          if (err.toString() === 'Error: Network Error')
            ToastAndroid.show(
              'لطفا اتصال اینترنت رو چک کن.',
              ToastAndroid.LONG,
            );
        });
    };

    getCategoryList();
  }, []);

  useEffect(() => {
    const getNewList = () => {
      axios({
        method: 'get',
        url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "مقاله")order by created desc&start=${0}&limit=${5}`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          // setCategoryList(res.data.results);
          // setIsLoading(false);
          setNewList(res.data.results);
          console.log('newlist', res);
        })
        .catch((err) => {
          console.error(err, err.response);
          // setIsLoading(false);
          // if (err.toString() === 'Error: Network Error')
          // ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        });
    };

    getNewList();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ paddingBottom: 50, paddingTop: 24 }}>
          <FlatList
            ListHeaderComponent={
              <>
                <Carousel
                  slideStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  // containerCustomStyle={{ flex: 1 }}
                  autoplay
                  inverted
                  data={newList}
                  onSnapToItem={(index) => setActiveSlide(4 - index)}
                  renderItem={({ item }) => (
                    <NewestArticles title={item.title} />
                  )}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH - 65}
                />
                <Pagination
                  dotsLength={newList.length}
                  activeDotIndex={activeSlide}
                  //containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)',margin:0,padding:0 }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    //marginHorizontal: 8,
                    backgroundColor: COLOR.btn,
                  }}
                  inactiveDotStyle={{
                    backgroundColor: COLOR.btn,
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </>
            }
            // style={{ paddingBottom:40,backgroundColor:'pink' }}
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryList
                navigation={navigation}
                catId={item.content.id}
                catName={item.title}
                buttonTitle="مشاهده همه"
                category={item.title}
                MoreBtnOnPress={() => {
                  props.navigation.navigate('ArticlesList', {
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
