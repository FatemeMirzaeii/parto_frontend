import React from 'react';
import { Dimensions, Linking, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import table, {
  IGNORED_TAGS,
  defaultTableStylesSpecs,
  cssRulesFromSpecs,
} from '@native-html/table-plugin';
import WebView from 'react-native-webview';

//styles
import { COLOR, FONT } from '../styles/static';

//todo:set fontFamily for table
const HTMLRender = ({ html }) => {
  function getFontAssetURL(fontFileName) {
    return `url(../../android/app/src/main/assets/fonts/${fontFileName})`;
  }
  const openSansUnicodeRanges =
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';

  const openSansRegular = getFontAssetURL('IRANSansMobile(FaNum).ttf');

  const cssRules =
    cssRulesFromSpecs({
      ...defaultTableStylesSpecs,
      // outerBorderWidthPx: 1,
      // rowsBorderWidthPx: 1,
      // columnsBorderWidthPx: 2,
      thOddBackground: COLOR.purple,
      thEvenBackground: COLOR.purple,
      trOddBackground: 'transparent',
      trEvenBackground: 'transparent',
      thEvenColor: '#000000',
      trOddColor: '#000000',
      thOddColor: '#000000',
      trEvenColor: '#000000',
      // cellSpacingEm: 0.3,
      fitContainerWidth: true,
      fontWeight: 'normal',
      fontFamily: '"Open Sans"',
    }) +
    `
body {
  direction: rtl;
}
` +
    `
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  src: ${openSansRegular}, format('ttf');
  unicode-range: ${openSansUnicodeRanges};

}
`;

  const htmlProps = {
    WebView,
    ignoredTags: IGNORED_TAGS,
    renderersProps: {
      table: {
        // ...tableConfig,
        ...cssRules,
      },
    },
  };

  return (
    <HTML
      {...htmlProps}
      source={{ html }}
      tagsStyles={HTMLTagsStyles}
      ignoredStyles={['height', 'width']}
      imagesMaxWidth={Dimensions.get('window').width}
      style={styles.HTML}
      onLinkPress={(event, url) => {
        console.log('event', event);
        Linking.openURL(url);
      }}
      renderers={{
        table: table,
        ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          const { nodeIndex, key, listsPrefixesRenderers } = passProps;
          children =
            children &&
            children.map((child, index) => {
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
              prefix =
                listsPrefixesRenderers && listsPrefixesRenderers.ul ? (
                  listsPrefixesRenderers.ul(...rendererArgs)
                ) : (
                  <View style={styles.circle} />
                );

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
            nodeIndex,
            key,
            listsPrefixesRenderers,
          } = passProps;
          children =
            children &&
            children.map((child, index) => {
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
