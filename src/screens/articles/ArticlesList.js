import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

//components
import ArticleCard from '../../components/ArticleCard';
import EmptyList from '../../components/EmptyList';
import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';

//services
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';

///styles
import { COLOR } from '../../styles/static';

const ArticlesList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { catId, catName } = route.params;

  useEffect(() => {
    const getCategoryContent = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all order by created asc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          let con = [];
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            axios({
              method: 'get',
              url: `${baseUrl}/rest/api/content/${res.data.results[i].id}/child/attachment`,
              headers: {
                Authorization: 'Basic ' + authCode,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'X-Atlassian-Token': 'no-check',
              },
            })
              .then((response) => {
                const data = response.data.results;
                const imgUrl = [];

                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `${baseUrl}${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );
                }
                article.push({
                  ...con[i],
                  cover: imgUrl[0],
                  images: imgUrl,
                  catId: catId,
                });
                setIsLoading(false);
                setData(article);
              })
              .catch((err) => {
                console.error(err, err.response);
              });
          }
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };
    getCategoryContent();
  }, [catId]);

  const _handleSearch = (text) => {
    setData(article);
    const result = article.filter((i) => {
      return i.title.includes(text);
    });
    console.log('result', result);
    setData(result);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ flex: 1, paddingTop: 24, paddingBottom: 50 }}>
          <SearchBar
            undertxt="جستجو"
            onChangeText={_handleSearch}
            iconColor={COLOR.btn}
          />
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ArticleCard
                name={item.title}
                image={item.cover}
                onPress={() =>
                  navigation.navigate('ArticleDetails', {
                    articleContent: item,
                    catName: catName,
                  })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default ArticlesList;
