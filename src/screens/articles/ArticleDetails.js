import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import HTML from 'react-native-render-html';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import styles, { HTMLTagsStyles } from './styles';

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
    return (
      <>
        <SafeAreaView style={styles.headerCotainer}>
          <View style={styles.headerWrapper}>
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
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.titleStyle}>{articleContent.title}</Text>
      </View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.badge}>{catName}</Text>
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

  console.log(articleContent.body.storage.value);
  console.log('catName', catName);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StickyParallaxHeader
        headerType="AvatarHeader"
        hasBorderRadius={false}
        backgroundColor="pink"
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
    </SafeAreaView>
  );
};

export default ArticleDetails;
