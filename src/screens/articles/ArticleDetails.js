import React from 'react';
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
} from 'react-native';
import { Icon } from 'native-base';
import HTML from 'react-native-render-html';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import TextTicker from 'react-native-text-ticker';

//styles
import styles from './styles';
import { HTMLTagsStyles }  from '../../styles/commonStyles'

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const ArticleDetails = ({ route, navigation }) => {
  const { articleContent, catName } = route.params;

  const _renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    // console.log('articleContent', articleContent);
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
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.titleStyle}>{articleContent.title}</Text>
      </View>
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
    </View>
  );

  // console.log(articleContent.body.storage.value);
  // console.log('catName', catName);

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
