import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'native-base';
import HTML from 'react-native-render-html';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import styles, { HTMLTagsStyles } from './styles';
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const ArticleDetails = ({ route, navigation }) => {
  const [author, setAuthor] = useState('');
  const { articleContent, catName } = route.params;
  useEffect(() => {
    const getAuthor = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/content/${articleContent.id}`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log('res', res);
          setAuthor(res.data.history.createdBy.displayName);
          //setIsLoading(false);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getAuthor();
  }, [articleContent.id]);

  const _renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    console.log('articleContent', articleContent);
    return (
      <>
        <SafeAreaView style={styles.headerCotainer}>
          <View style={styles.headerWrapper}>
            <Icon
              type="AntDesign"
              name="arrowright"
              onPress={() => navigation.goBack()}
              style={styles.icon}
            />
            <Animated.View style={{ opacity }}>
              <Text style={styles.headerText}>{articleContent.title}</Text>
            </Animated.View>
            <Icon
              type="AntDesign"
              name="arrowright"
              onPress={() => navigation.goBack()}
              style={styles.icon}
            />
          </View>
        </SafeAreaView>
      </>
    );
  };

  const _renderForeground = () => (
    <ImageBackground
      style={styles.imageHeader}
      source={
        articleContent.cover
          ? { uri: articleContent.cover }
          : require('../../../assets/images/NoPic.jpeg')
      }>
      {author !== '' && (
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.titleStyle}>{articleContent.title}</Text>
        </View>
      )}
      {author !== '' && (
        <View style={{ flex: 0.2, flexDirection: 'row-reverse' }}>
          <TouchableOpacity
            style={styles.categoryWrapper}
            onPress={() => {
              navigation.navigate('ArticlesList', {
                catId: articleContent.catId,
                catName: catName,
              });
            }}>
            <Text style={styles.badge}>{catName}</Text>
          </TouchableOpacity>
          <Text style={styles.author}>{`نویسنده: ${author}`}</Text>
        </View>
      )}
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
    </View>
  );

  console.log(articleContent.body.storage.value);
  console.log('catName', catName);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StickyParallaxHeader
        headerType="AvatarHeader"
        hasBorderRadius={false}
        backgroundColor="#FAFAFA"
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default ArticleDetails;
