import axios from 'axios';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import base64 from 'react-native-base64';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR, FONT, SIZE } from '../styles/static';

const authCode = base64.encode('m.vosooghian:m.vosooghian');

const CategoryList = (props) => {
  const [categoryContent, setCategoryContent] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { catId } = props;

  useEffect(() => {
    const getCategoryContent = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all&start=${0}&limit=${9}`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          let con = [];
          console.log(res);
          console.log('categoryContent', res.data.results);
          setCategoryContent(res.data.results);
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            //console.log(res.data.results[i].id);
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
                // content = [];
                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `https://ketab.partobanoo.com${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );

                  console.log('imgUrl', imgUrl);
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
                console.log('imgUrl', imgUrl);
                console.log('new', article);
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

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ArticleDetails', { articleContent: item });
        }}
        style={styles.cardButton}>
        <ImageBackground
          style={styles.imageWrapper}
          imageStyle={styles.image}
          source={{
            uri: item.cover
              ? item.cover
              : 'https://ravandbazar.ir/wp-content/uploads/2020/04/%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%DA%A9%D8%B3.jpg',
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={styles.textGradient}>
            <View style={styles.textWrapper}>
              <Text numberOfLines={2} style={styles.text}>
                {item.title}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  console.log('new', article);

  return (
    <>
      {!isLoading && (
        <View style={styles.main}>
          <View style={styles.moreButtonWrapper}>
            <TouchableOpacity onPress={props.MoreBtnOnPress}>
              <View style={styles.moreButtonBox}>
                <Icon
                  type="FontAwesome"
                  name="angle-left"
                  style={styles.moreButtonIcon}
                />
                <Text style={styles.moreButtonText}>{props.buttonTitle}</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.categoryText}>{props.category}</Text>
          </View>

          <FlatList
            horizontal
            inverted
            data={article}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 30,
  },
  moreButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 12,
  },
  moreButtonBox: {
    flex: 1,
    flexDirection: 'row',
  },
  moreButtonIcon: {
    fontSize: 13,
    color: '#95c9e1',
    paddingVertical: 7,
    paddingRight: 5,
  },
  moreButtonText: {
    fontFamily: FONT.bold,
    fontSize:SIZE[16],
     color: '#95c9e1',
    //color: COLOR.currentPage,
  },
  categoryText: {
    fontFamily: FONT.bold,
    fontSize:SIZE[16]
  },
  cardButton: {
    margin: 5,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageWrapper: {
    width: 140,
    height: 180,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 15,
  },
  textGradient: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row-reverse',
    padding: 5,
  },
  text: {
    color: '#fff',
    fontFamily: FONT.light,
    fontSize:SIZE[14],
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CategoryList;
