import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import TextTicker from 'react-native-text-ticker';

//components
import Loader from '../../components/Loader';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';
import { HTMLTagsStyles } from '../../styles/commonStyles';

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const ArticleDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleBody, setArticleBody] = useState([]);
  const { articleContent, catName } = route.params;

  useEffect(() => {
    const getArticleBody = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/content/${articleContent.id}?expand=body.storage&depth=all`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        setArticleBody(res.data.body.storage.value);
        console.log('setArticleBody', res.data.body.storage.value);
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        }
      }
      setIsLoading(false);
    };
    getArticleBody();
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
            <Animated.View style={{ opacity }}>
              <TextTicker
                style={styles.headerText}
                isRTL
                loop
                bounce
                duration={9000}
                repeatSpacer={150}
                marqueeDelay={3000}>
                {articleContent.title}
              </TextTicker>
            </Animated.View>
            {/* <Icon
              type="AntDesign"
              name="arrowright"
              onPress={() => navigation.goBack()}
              style={styles.icon}
            /> */}
            <Icon
              reverse
              size={15}
              name="arrow-right"
              type="font-awesome"
              color={COLOR.btn}
              onPress={() => navigation.pop()}
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
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.titleStyle}>{articleContent.title}</Text>
      </View>
      <View style={styles.btnWrapper}>
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
      </View>
    </ImageBackground>
  );

  const _renderBody = () => (
    <View style={styles.contentContiner}>
      {isLoading ? (
        <Loader />
      ) : (
        <HTML
          tagsStyles={HTMLTagsStyles}
          html={articleBody.toString()}
          ignoredStyles={['height', 'width']}
          imagesMaxWidth={Dimensions.get('window').width}
          style={styles.HTML}
          onLinkPress={(event, url) => {
            Linking.openURL(url);
          }}
        />
      )}
    </View>
  );

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
