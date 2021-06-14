import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import TextTicker from 'react-native-text-ticker';

//components
import HTMLRender from '../../components/HTMLRender';
import Loader from '../../components/Loader';
import RtlSnackBar from '../../components/RtlSnackBar';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const ArticleDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleBody, setArticleBody] = useState([]);
  const { articleContent, catName } = route.params;
  const [snackVisible, setSnackVisible] = useState(false);

  useEffect(() => {
    let isCancelled = false;
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
        if (!isCancelled) {
          setArticleBody(res.data.body.storage.value);
        }
        //console.log('setArticleBody', res.data.body.storage.value);
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          setSnackVisible(true);
        }
      }
      setIsLoading(false);
    };
    getArticleBody();
    return () => {
      isCancelled = true;
    };
  }, [articleContent.id]);

  const _renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    //console.log('articleContent', articleContent);
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
            <Icon
              size={16}
              name="right-arrow"
              type="parto"
              color={COLOR.pink}
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
      {isLoading ? <Loader /> : <HTMLRender html={articleBody.toString()} />}
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
      <RtlSnackBar
        visible={snackVisible}
        message="لطفا اتصال اینترنت رو چک کن."
        onDismiss={() => setSnackVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ArticleDetails;
