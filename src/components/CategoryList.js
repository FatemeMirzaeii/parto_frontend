import axios from 'axios';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import ImageResizer from 'react-native-image-resizer';
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import base64 from 'react-native-base64';
import LinearGradient from 'react-native-linear-gradient';
import { FONT } from '../styles/static';

const authCode = base64.encode('m.vosooghian:m.vosooghian');

const CategoryList = (props) => {
  const [categoryContent, setCategoryContent] = useState([]);
  const [image, setImage] = useState([]);
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
          const ID = [];
          let con = [];
          console.log(res);
          console.log('categoryContent', res.data.results);
          setCategoryContent(res.data.results);
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            console.log(res.data.results[i].id);
            // ID.push(res.data.results[i].id)
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
                var allUrls = [];
                const data = response.data.results;
                const imgUrl = [];
                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `https://ketab.partobanoo.com${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );

                  console.log('imgUrl', imgUrl);
                  setImage(imgUrl[0]);
                }
                article.push({ ...con[i], cover: image, images: imgUrl });
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
          console.log(ID);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };
    getCategoryContent();
  }, [catId]);

  const imageResize = () => {
    ImageResizer.createResizedImage(
      'https://ketab.partobanoo.com/download/attachments/3869820/IMG-20200618-WA0012.jpg?os_authType=basic',
      140,
      180,
    )
      .then((response) => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
        console.log('resize', response.uri);
        return response.uri;
      })
      .catch((err) => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  };

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ArticleDetails', { articleContent: item });
        }}
        // onPress={props.cardOnPress}
        style={{
          // padding: 10,

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
        }}>
        <ImageBackground
          style={{
            // resizeMode: 'cover',
            width: 140,
            height: 180,
          }}
          // imageStyle={{borderRadius: 15}}
          imageStyle={{ resizeMode: 'cover', flex: 1, borderRadius: 15 }}
          source={{
            uri:
              'https://ketab.partobanoo.com/download/attachments/3869820/IMG-20200618-WA0012.jpg?os_authType=basic',
            //   ,
            // uri:imageResize()
            // uri:item.cover?item.cover:'https://ketab.partobanoo.com/download/attachments/3869820/IMG-20200618-WA0012.jpg?os_authType=basic',
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row-reverse', padding: 5 }}>
              <Text
                numberOfLines={2}
                //ellipsizeMode='tail'
                style={{
                  color: '#fff',
                  fontFamily: FONT.medium,
                }}>
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
    <View
      style={{
        marginBottom: 30,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          //backgroundColor:'red'
          marginHorizontal: 12,
        }}>
        <TouchableOpacity
          onPress={props.MoreBtnOnPress}
          style={
            {
              // backgroundColor: '#f0f8ff',
              // padding: 10,
              // margin: 15,
              //borderRadius:15,
              //marginTop:40
            }
          }>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              //justifyContent: 'space-between',
            }}>
            <Icon
              type="FontAwesome"
              name="angle-left"
              // style={styles.icon(props)}
              style={{ fontSize: 13, color: '#95c9e1', padding: 5 }}
            />
            <Text style={{ fontFamily: FONT.light, color: '#95c9e1' }}>
              {props.buttonTitle}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: FONT.bold }}>{props.category}</Text>
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
  );
};

export default CategoryList;
