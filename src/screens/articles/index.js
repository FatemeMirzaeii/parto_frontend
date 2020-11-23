import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView ,ToastAndroid,} from 'react-native';
import axios from 'axios';

//components
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/Loader';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

const Articles = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { navigation } = props;
  useEffect(() => {
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "دسته‌بندی")order by created asc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          setCategoryList(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err, err.response);
          setIsLoading(false);
          if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        });
    };

    getCategoryList();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ paddingBottom: 50, paddingTop: 24 }}>
          <FlatList
            style={{ paddingVertical: 15 }}
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryList
                navigation={navigation}
                catId={item.content.id}
                catName={item.title}
                buttonTitle="مشاهده همه"
                category={item.title}
                MoreBtnOnPress={() => {
                  props.navigation.navigate('ArticlesList', {
                    catId: item.content.id,
                    catName: item.title,
                  });
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Articles;
