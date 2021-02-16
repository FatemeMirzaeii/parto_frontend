import React from 'react';
import { Dimensions, Linking, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';

//styles
import { COLOR, FONT } from '../styles/static';

const HTMLRender = ({ html }) => {
  return (
    <HTML
      html={html}
      tagsStyles={HTMLTagsStyles}
      ignoredStyles={['height', 'width']}
      imagesMaxWidth={Dimensions.get('window').width}
      style={styles.HTML}
      onLinkPress={(event, url) => {
        console.log('event', event);
        Linking.openURL(url);
      }}
      renderers={{
        ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          const {
            rawChildren,
            nodeIndex,
            key,
            listsPrefixesRenderers,
          } = passProps;

          children =
            children &&
            children.map((child, index) => {
              const rawChild = rawChildren[index];
              let prefix = false;
              const rendererArgs = [
                htmlAttribs,
                children,
                convertedCSSStyles,
                {
                  ...passProps,
                  index,
                },
              ];

              if (rawChild) {
                if (rawChild.parentTag === 'ul' && rawChild.tagName === 'li') {
                  prefix =
                    listsPrefixesRenderers && listsPrefixesRenderers.ul ? (
                      listsPrefixesRenderers.ul(...rendererArgs)
                    ) : (
                      <View style={styles.circle} />
                    );
                }
              }
              return (
                <View
                  key={`list-${nodeIndex}-${index}-${key}`}
                  style={styles.prefix}>
                  <View style={styles.child}>{child}</View>
                  {prefix}
                </View>
              );
            });
          return <View key={key}>{children}</View>;
        },
        ol: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          const {
            allowFontScaling,
            rawChildren,
            nodeIndex,
            key,
            listsPrefixesRenderers,
          } = passProps;

          children =
            children &&
            children.map((child, index) => {
              const rawChild = rawChildren[index];
              let prefix = false;
              const rendererArgs = [
                htmlAttribs,
                children,
                convertedCSSStyles,
                {
                  ...passProps,
                  index,
                },
              ];

              if (rawChild) {
                if (rawChild.parentTag === 'ol' && rawChild.tagName === 'li') {
                  prefix =
                    listsPrefixesRenderers && listsPrefixesRenderers.ol ? (
                      listsPrefixesRenderers.ol(...rendererArgs)
                    ) : (
                      <Text
                        allowFontScaling={allowFontScaling}
                        style={styles.number}>
                        ({index + 1}
                      </Text>
                    );
                }
              }
              return (
                <View
                  key={`list-${nodeIndex}-${index}-${key}`}
                  style={styles.prefix}>
                  <View style={styles.child}>{child}</View>
                  {prefix}
                </View>
              );
            });
          return <View key={key}>{children}</View>;
        },
      }}
    />
  );
};
HTMLRender.propTypes = {
  html: PropTypes.string.isRequired,
};

export default HTMLRender;

const HTMLTagsStyles = {
  h2: {
    textAlign: 'right',
    color: COLOR.purple,
    fontFamily: FONT.black,
    fontWeight: 'normal',
    margin: 3,
    paddingVertical: 10,
    lineHeight: 50,
  },
  h3: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    paddingVertical: 10,
    fontWeight: 'normal',
    margin: 5,
    color: 'black',
  },
  h4: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
  },
  h5: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
  },
  h6: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
    marginRight: 20,
  },
  p: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 7,
    fontSize: 16,
    lineHeight: 35,
  },
  span: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    fontWeight: 'normal',
    margin: 5,
    fontSize: 16,
    lineHeight: 35,
  },
  strong: {
    textAlign: 'right',
    fontFamily: FONT.medium,
    fontWeight: 'normal',
    margin: 5,
    fontSize: 16,
    lineHeight: 35,
  },
  ul: {
    direction: 'rtl',
  },
  ol: {
    direction: 'rtl',
  },
  li: {
    textAlign: 'right',
    fontFamily: FONT.regular,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: 15,
    lineHeight: 27,
    paddingRight: 20,
  },
};

const styles = StyleSheet.create({
  HTML: {
    width: '100%',
  },
  circle: {
    flexDirection: 'column-reverse',
    marginRight: 20,
    width: 8,
    height: 8,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: 'black',
    marginLeft: 20,
  },
  prefix: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  child: {
    flex: 1,
  },
  number: {
    flexDirection: 'column-reverse',
    marginRight: 20,
    marginLeft: 15,
    fontFamily: FONT.medium,
    fontSize: 15,
  },
});
