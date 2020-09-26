import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Dimensions, Linking, SafeAreaView, ScrollView,View} from 'react-native';
import { Icon } from 'react-native-elements';
import base64 from 'react-native-base64';
import HTML from 'react-native-render-html';
import styles, { HTMLTagsStyles } from './styles';
import { COLOR, FONT } from '../../styles/static';

const authCode = base64.encode('m.vosooghian:m.vosooghian');

const TreatiseHelp = ({ navigation }) => {
  const [helpContent, setHelpContent] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'راهنما',
      headerTitleStyle: {
        alignSelf: 'flex-end',
        color: 'black',
        fontSize: 17,
        fontFamily: FONT.medium,
      },
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  });

  useEffect(() => {
    const getHelpContent = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/content/10813920/?expand=body.storage&depth=all`,

        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log(res);
          console.log('result', res.data);
          console.log('result', res.data.body);
          setHelpContent(res.data.body.storage.value);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getHelpContent();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        {helpContent && (
          <HTML
            html={helpContent.toString()}
            // renderers={
            //  { 'ac:image' : () => (
            //     <View
            //       style={{ width: '100%', height: 1, backgroundColor: 'blue' }}
            //     />
            //   )}
            // }
            // ignoredStyles={['height', 'width']}
            // imagesMaxWidth={Dimensions.get('window').width}
            // style={styles.HTML}
            // tagsStyles={HTMLTagsStyles}
            // onLinkPress={(event, url) => {
            //   Linking.openURL(url);
            // }}
            // alterNode= {(node) => {
            //   const { name, parent } = node;
            //   // If the tag is an <a> and we've found a parent to be a blockquote
            //   // (see the utils part of this documentation to know more about getParentsTagsRecursively)
            //   if (
            //     name === "ac:image" 
                
            //   ) {
            //     // Let's assign a specific color to the node's attribs (if there already are)
            //     node.attribs = { ...(node.attribs || {}), source: `color:lightblue;` };
            //     return node;
            //   }
            //   // Don't return anything (eg a falsy value) for anything else so nothing is altered
            // }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TreatiseHelp;
