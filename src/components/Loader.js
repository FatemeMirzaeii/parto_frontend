import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import PropTypes from 'prop-types';

//styles
import { COLOR, WIDTH } from '../styles/static';

const Loader = (props) => {
  switch (props.type) {
    case 'ActivityIndicator':
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLOR.pink} />
        </View>
      );

    case 'ArticleLoader':
      return (
        <ContentLoader
          rtl
          speed={1}
          width={'100%'}
          height={270}
          backgroundColor="#ddd"
          foregroundColor="#fafafa"
          {...props}>
          <Rect x="23" y="30" rx="3" ry="3" width="80" height="6" />
          <Rect x={WIDTH - 100} y="30" rx="3" ry="3" width="80" height="6" />
          <Rect x="5" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="155" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="305" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="455" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="605" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="755" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="905" y="65" rx="15" ry="15" width="140" height="180" />
          <Rect x="1055" y="65" rx="15" ry="15" width="140" height="180" />
        </ContentLoader>
      );

    case 'BgTreatiseLoader':
      return (
        <ContentLoader
          rtl
          speed={1}
          width={'100%'}
          height={270}
          backgroundColor="#ddd"
          foregroundColor="#fafafa">
          <Rect x="15" y="37" rx="15" ry="15" width="440" height="180" />
        </ContentLoader>
      );

    case 'TreatiseLoader':
      return (
        <ContentLoader
          rtl
          speed={1}
          width={'100%'}
          height={270}
          backgroundColor="#ddd"
          foregroundColor="#fafafa"
          {...props}>
          <Rect x="116" y="20" rx="3" ry="3" width="150" height="6" />
          <Rect x="125" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="300" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="455" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="610" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="765" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="920" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="1075" y="65" rx="15" ry="15" width="135" height="100" />
          <Rect x="1230" y="65" rx="15" ry="15" width="135" height="100" />
        </ContentLoader>
      );

    default:
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLOR.pink} />
        </View>
      );
  }
};

Loader.propTypes = {
  type: PropTypes.string,
};
Loader.defaultProps = {
  type: 'ActivityIndicator',
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Loader;
