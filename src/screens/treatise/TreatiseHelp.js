import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Dimensions, Linking, SafeAreaView, ScrollView } from 'react-native';
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
        alignSelf: 'center',
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
            ignoredStyles={['height', 'width']}
            imagesMaxWidth={Dimensions.get('window').width}
            style={styles.HTML}
            tagsStyles={HTMLTagsStyles}
            onLinkPress={(event, url) => {
              Linking.openURL(url);
            }}
            // renderers={
            //   (p = () => (
            //     <View
            //       style={{ width: '100%', height: 1, backgroundColor: 'blue' }}
            //     />
            //   ))
            // }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TreatiseHelp;
