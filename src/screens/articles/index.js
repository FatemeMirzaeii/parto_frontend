import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import base64 from 'react-native-base64';
import CategoryList from '../../components/CategoryList';
import { COLOR } from '../../styles/static';

const authCode = base64.encode('m.vosooghian:m.vosooghian');

const Articles = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { navigation } = props;
  useEffect(() => {
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "دسته‌بندی")order by created desc`,
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
        });
    };

    getCategoryList();
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLOR.btn} />
        </View>
      ) : (
        <SafeAreaView>
          <FlatList
            style={{ paddingVertical: 15 }}
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryList
                navigation={navigation}
                catId={item.content.id}
                buttonTitle="مشاهده همه"
                category={item.title}
                MoreBtnOnPress={() => {
                  props.navigation.navigate('ArticlesList', {
                    catId: item.content.id,
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
