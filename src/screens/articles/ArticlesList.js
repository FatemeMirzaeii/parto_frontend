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
import { articlesBaseUrl } from '../../services/urls';

//util
import { e2p, a2p } from '../../util/func';

///styles
import { COLOR } from '../../styles/static';

const ArticlesList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { catId, catName } = route.params;
  const perPage = 25;

  useEffect(() => {
    _handleLoadMore();
  }, [catId]);

  const _handleLoadMore = async () => {
    await axios({
      method: 'get',
      url: `${articlesBaseUrl}/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all order by created asc&start=${page}&limit=${perPage}`,
      // url: `${articlesBaseUrl}/rest/api/content/search?cql=(parent=${catId} and type=page) order by created asc & start=${page} & limit=${perPage}`,
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
            url: `${articlesBaseUrl}/rest/api/content/${res.data.results[i].id}/child/attachment`,
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
                  `${articlesBaseUrl}${
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
              setPage((pre) => pre + 25);
            })
            .catch((err) => {
              console.error(err, err.response);
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
      });
  };

  const _handleSearch = (text) => {
    setData(article);
    const result = article.filter((i) => {
      return (
        i.title.includes(text) ||
        i.title.includes(e2p(text)) ||
        i.title.includes(a2p(text))
      );
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
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.1}
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
