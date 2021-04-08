import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';

//components
import HTMLRender from '../../components/HTMLRender';
import Loader from '../../components/Loader';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

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
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
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
          <HTMLRender html={articleBody.toString()} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TreatiseDetails;
