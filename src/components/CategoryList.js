import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

//services
import { authCode } from '../services/authCode';
import { baseUrl } from '../services/urls';

//styles
import { COLOR, FONT, SIZE } from '../styles/static';

const CategoryList = (props) => {
  const [categoryContent, setCategoryContent] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { catId, catName } = props;

  useEffect(() => {
    const getCategoryContent = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all&start=${0}&limit=${9}`,
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
            axios({
              method: 'get',
              url: `${baseUrl}/rest/api/content/${res.data.results[i].id}/child/attachment`,
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
                    `${baseUrl}${
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
          props.navigation.navigate('ArticleDetails', {
            articleContent: item,
            catName: catName,
          });
        }}
        style={styles.cardButton}>
        <ImageBackground
          style={styles.imageWrapper}
          imageStyle={styles.image}
          source={
            item.cover
              ? { uri: item.cover }
              : require('../../assets/images/NoPic.jpeg')
          }>
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
    fontSize: 14,
    color: COLOR.tiffany,
    paddingVertical: 7,
    paddingRight: 5,
  },
  moreButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZE[16],
    color: COLOR.tiffany,
  },
  categoryText: {
    fontFamily: FONT.bold,
    fontSize: SIZE[16],
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
    fontSize: 14,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CategoryList;
