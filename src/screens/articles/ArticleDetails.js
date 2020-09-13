import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base64 from 'react-native-base64';
import {
  Text,
  View,
  Dimensions,
  Animated,
  ImageBackground,
  Linking,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Icon } from 'native-base';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import HTML from 'react-native-render-html';
import styles, { HTMLTagsStyles } from './styles';

const authCode = base64.encode('m.vosooghian:m.vosooghian');
const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const ArticleDetails = ({ route, navigation }) => {
  const [article, setArticle] = useState([]);
  const { articleContent } = route.params;
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const getArticle = () => {
  //     axios({
  //       method: 'get',
  //       //url: `https://jsonplaceholder.ir/users`,
  //       //url:'https://ketab.partobanoo.com/rest/api/content/?expand=body.view&depth=all/search?os_authType=basic&cql=(space.key=12345 and type=page and title="قاعدگی")',
  //       // url:  'https://ketab.partobanoo.com/rest/api/search?os_authType=basic&cql=(space.key=12345 and type=page and label="مقاله"  ) order by created desc&start=' +
  //       // 0 +
  //       // "&limit=" +
  //       // 6,
  //       // url:'https://ketab.partobanoo.com/rest/api/content/?expand=body.view&depth=all',
  //       url:
  //         'https://ketab.partobanoo.com/rest/api/content/3867138/?expand=body.storage&depth=all',
  //       headers: {
  //         Authorization: 'Basic ' + authCode,
  //         //   'Content-Type': 'application/json',
  //         //   "cache-control": "no-cache",
  //         'X-Atlassian-Token': 'no-check',
  //       },

  //       // headers: {
  //       //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //       // },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         //setUserList(res.data);
  //         console.log('article', res.data);
  //         console.log('body', res.data.body.storage.value);
  //         setArticle(res.data.body.storage.value);
  //       })
  //       .catch((err) => {
  //         console.error(err, err.response);
  //         // if (err.response && err.response.data) {
  //         //   setServerError(err.response.data.message)
  //         // }
  //       });
  //   };

  //   getArticle();
  // }, []);

  useEffect(() => {
    const getImage = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/content/${articleContent.id}/child/attachment`,

        headers: {
          Authorization: 'Basic ' + authCode,
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log(res);
          var allUrls = [];
          const data = res.data.results;
          //setImage(res.data.results);
          const imgUrl = [];
          for (let i = 0; i < data.length; i++) {
            imgUrl.push(
              `https://ketab.partobanoo.com${
                data[i]._links.download.split('?')[0]
              }?os_authType=basic`,
            );

            // var res2 =  fetch(imgUrl + "?os_authType=basic", options);
            // var data2 =  res2.blob();
            //  allUrls.push({
            //   title: data.results[i].title,
            //   url: URL.createObjectURL(data2),
            // });
            console.log('imgUrl', imgUrl);
            setImage(imgUrl[0]);

            //url: `https://ketab.partobanoo.com${imgUrl}?os_authType=basic`,
          }
          setImage(imgUrl[0]);
          setIsLoading(false);
          console.log('imgUrl', imgUrl);
          //console.log('image', res.data._expandable.attachment);
          // console.log('body',res.data.body.storage.value);
          // setArticle(res.data.body.storage.value);
        })
        .catch((err) => {
          console.error(err, err.response);
          // if (err.response && err.response.data) {
          //   setServerError(err.response.data.message)
          // }
        });
    };

    getImage();
  }, [articleContent.id]);

  const _renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <>
     { isLoading?
      <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}> 
      <ActivityIndicator  size="small" color="#0000ff"/>
     </View>:
      <SafeAreaView style={styles.headerCotainer}>
        <View style={styles.headerWrapper}>
          <Animated.View style={{ opacity }}>
            <Text style={styles.headerText}>{articleContent.title}</Text>
            {/* <Icon
              type="Feather"
              name="share-2"
              // onPress={this._shareContent}
              style={{fontSize: 18, color: 'white', padding: 10}}
            /> */}
          </Animated.View>
          <Icon
            type="AntDesign"
            name="arrowright"
            onPress={() => navigation.goBack()}
            style={styles.icon}
          />
        </View>
      </SafeAreaView>}
      </>
    );
  };

  const _renderForeground = () => (
    <ImageBackground
      style={styles.imageHeader}
      source={{
        uri: image,
      }}>
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.titleStyle}>{articleContent.title}</Text>
      </View>
    </ImageBackground>
  );

  const _renderBody = () => (
    <View style={styles.contentContiner}>
      <HTML
        tagsStyles={HTMLTagsStyles}
        html={articleContent.body.storage.value.toString()}
        ignoredStyles={['height', 'width']}
        imagesMaxWidth={Dimensions.get('window').width}
        style={styles.HTML}
        onLinkPress={(event, url) => {
          Linking.openURL(url);
        }}
      />
      {/* <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} /> */}
    </View>
  );

  // console.log('articleContent',articleContent.body.storage.value)
  console.log('image', image);
  return (
    <>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      {!isLoading && (
        <StickyParallaxHeader
          headerType="AvatarHeader"
          hasBorderRadius={false}
          backgroundColor="pink"
          //backgroundColor="transparent"
          scrollEvent={event(
            [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
            {
              useNativeDriver: false,
            },
          )}
          parallaxHeight={430}
          transparentHeader={true}
          foreground={_renderForeground}
          renderBody={_renderBody}
          header={_renderHeader}
          snapStartThreshold={50}
          snapStopThreshold={250}
          snapValue={167}
        />
      )}
    </>
  );
};

export default ArticleDetails;
