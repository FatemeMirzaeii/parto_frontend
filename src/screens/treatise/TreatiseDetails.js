import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

//components
import HTMLRender from '../../components/HTMLRender';
import Loader from '../../components/Loader';
import BackButton from '../../components/BackButton';
import RtlSnackBar from '../../components/RtlSnackBar';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import styles from './styles';

const TreatiseDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleBody, setArticleBody] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);

  const { treatiseContent } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: treatiseContent.title,
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
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
          setSnackVisible(true);
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
      <RtlSnackBar
        visible={snackVisible}
        message="لطفا اتصال اینترنت رو چک کن."
        onDismiss={() => setSnackVisible(false)}
      />
    </SafeAreaView>
  );
};

export default TreatiseDetails;
