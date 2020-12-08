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
import styles from './styles';

const Articles = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [newest, setNewest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newestIsLoading, setNewestIsLoading] = useState(true);
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
         let con = [];
         let temp=[]
         console.log('getNewList',res);
        //  console.log('categoryContent', res.data.results);
         setNewList(res.data.results);
         con = res.data.results;
         for (let i = 0; i < con.length; i++) {
           axios({
             method: 'get',
             url: `${articlesBaseUrl}/rest/api/content/${con[i].content.id}/child/attachment`,
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
               // content = [];
               for (let i = 0; i < data.length; i++) {
                 imgUrl.push(
                   `${articlesBaseUrl}${
                     data[i]._links.download.split('?')[0]
                   }?os_authType=basic`,
                 );
               }
              //  newest.push({
              //    ...con[i],
              //    cover: imgUrl[0],
              //    image: imgUrl,
              //    //catId: catId,
              //  });
              //  setNewest({ ...con[i],
              //   cover: imgUrl[0],
              //   image: imgUrl,})
               temp[i]={...con[i],
                   cover: imgUrl[0],
                   image: imgUrl,}
               setNewest(temp)
               setNewestIsLoading(false)
               console.log('imgUrl', imgUrl);
               console.log('newest*********', newest);
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

   getNewList();
  }, []);

  return (
    <>
      {isLoading && newestIsLoading? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.main}>
          <FlatList
            ListHeaderComponent={
               <>
                <Carousel
                  slideStyle={styles.slider}
                  // containerCustomStyle={{ flex: 1 }}
                  autoplay
                  inverted
                  data={newest}
                  onSnapToItem={(index) => setActiveSlide(4 - index)}
                  renderItem={({ item }) => (
                    <NewestArticles title={item.content.title} image={item.cover}/>
                  )}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH - 65}
                />
                <Pagination
                  dotsLength={newList.length}
                  activeDotIndex={activeSlide}
                  //containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)',margin:0,padding:0 }}
                  dotStyle={styles.paginationDots}
                  inactiveDotStyle={styles.inactiveDot}
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
