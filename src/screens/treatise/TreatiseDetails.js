import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Dimensions, Linking, SafeAreaView, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import { HTMLTagsStyles } from '../../styles/commonStyles';
import Loader from '../../components/Loader';

const TreatiseDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleBody, setArticleBody] = useState([]);
  const { treatiseContent } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: treatiseContent.title,
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
        />
      ),
    });
  });

  useEffect(() => {
    let isCancelled = false;
    const getArticleBody = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/content/${treatiseContent.id}?expand=body.storage&depth=all`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        if (!isCancelled) {
          setArticleBody(res.data.body.storage.value);
        }

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
    return () => {
      isCancelled = true;
    };
  }, [treatiseContent.id]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.contentContiner}>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TreatiseDetails;
