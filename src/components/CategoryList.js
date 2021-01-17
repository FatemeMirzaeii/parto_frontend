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

//components
import Loader from './CatListLoader';

//services
import { authCode } from '../services/authCode';
import { articlesBaseUrl } from '../services/urls';

//styles
import { COLOR, FONT, SIZE } from '../styles/static';

const CategoryList = (props) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { catId, catName, treatise } = props;

  useEffect(() => {
    const getCategoryContent = async () => {
      try {
        let arts = [];
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/content/search?cql=(parent=${catId} and type=page) order by created desc&start=${0}&limit=${10}`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        let con = [];
        // console.log('myres', res);
        // console.log('categoryContent', res.data.results);
        con = res.data.results;
        for (let i = 0; i < con.length; i++) {
          try {
            const response = await axios({
              method: 'get',
              url: `${articlesBaseUrl}/rest/api/content/${con[i].id}/child/attachment`,
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
            arts.push({
              ...con[i],
              cover: imgUrl[0],
              images: imgUrl,
              catId: catId,
            });
            // console.log('imgUrl', imgUrl);
          } catch (err) {
            console.error(err, err.response);
          }
          setArticles(arts);
        }
      } catch (err) {
        console.error(err, err.response);
      }
      setIsLoading(false);
    };
    getCategoryContent();
  }, [catId]);

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          treatise
            ? props.navigation.navigate('TreatiseDetails', {
                treatiseContent: item,
              })
            : props.navigation.navigate('ArticleDetails', {
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
  //console.log('new', articles);

  return (
    <>
      {isLoading ? (
        <Loader leftTxt={treatise ? false : true} />
      ) : (
        <View style={styles.main}>
          <View style={styles.moreButtonWrapper}>
            <TouchableOpacity onPress={props.MoreBtnOnPress}>
              {props.moreBtn ? (
                <View style={styles.moreButtonBox}>
                  <Icon
                    type="FontAwesome"
                    name="angle-left"
                    style={styles.moreButtonIcon}
                  />
                  <Text style={styles.moreButtonText}>{props.buttonTitle}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
            <Text style={styles.categoryText}>{props.category}</Text>
          </View>

          <FlatList
            horizontal
            inverted
            data={articles}
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
    marginBottom: 17,
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
    color: COLOR.purple,
    //paddingVertical: '2%',//for responsive
    paddingVertical: 6,
    paddingRight: 5,
  },
  moreButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZE[16],
    color: COLOR.purple,
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
    elevation: 3,
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
    fontSize: SIZE[14],
    textAlign: 'center',
  },
});

export default CategoryList;
