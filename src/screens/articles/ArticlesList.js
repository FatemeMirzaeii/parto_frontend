import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

//components
import ArticleCard from '../../components/ArticleCard';
import EmptyList from '../../components/EmptyList';
import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';
import RtlSnackBar from '../../components/RtlSnackBar';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//util
import { e2p, a2p } from '../../util/func';

///styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const ArticlesList = ({ route, navigation }) => {
  const { catId, catName } = route.params;
  const [article, setArticle] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [snackVisible, setSnackVisible] = useState(false);
  const perPage = 25;

  useEffect(() => {
    let isCancelled = false;
    const getArticles = async () => {
      try {
        let arts = [];
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/content/search?cql=(parent=${catId} and type=page) order by created desc &start=${page}&limit=${perPage}`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });
        let con = [];
        // console.log('myres', res);
        // console.log('categoryContent', res.data.results);
        con = res.data.results;
        if (con.length === 0) {
          setVisible(false);
        }

        for (let i = 0; i < con.length; i++) {
          try {
            const response = await axios({
              method: 'get',
              url: `${articlesBaseUrl}/rest/api/content/${con[i].id}/child/attachment`,
              headers: {
                Authorization: 'Basic ' + authCode,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'X-Atlassian-Token': 'no-check',
              },
            });
            //console.log('response', response);
            const dataSource = response.data.results;
            const imgUrl = [];

            for (let j = 0; j < dataSource.length; j++) {
              imgUrl.push(
                `${articlesBaseUrl}${
                  dataSource[j]._links.download.split('?')[0]
                }?os_authType=basic`,
              );
            }
            arts.push({
              ...con[i],
              cover: imgUrl[0],
              images: imgUrl,
              catId: catId,
            });
            //console.log('imgUrl', imgUrl);
          } catch (err) {
            console.error(err, err.response);
            if (err.toString() === 'Error: Network Error') {
              setSnackVisible(true);
            }
          }
          setArticle([...article, ...arts]);
          setData([...article, ...arts]);
          setVisible(true);
        }
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          setSnackVisible(true);
        }
      }
      setLoading(false);
    };
    getArticles();
    return () => {
      isCancelled = true;
    };
  }, [catId, page]);

  const _handleLoadMore = () => {
    setPage(page + 25);
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
    setData(result);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.main}>
          <SearchBar
            undertxt="جستجو"
            onChangeText={_handleSearch}
            iconColor={COLOR.pink}
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
            ListFooterComponent={visible ? <Loader /> : null}
            onEndReached={() => _handleLoadMore()}
            onEndReachedThreshold={10}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
          <RtlSnackBar
            visible={snackVisible}
            message="لطفا اتصال اینترنت رو چک کن."
            onDismiss={() => setSnackVisible(false)}
          />
        </SafeAreaView>
      )}
    </>
  );
};
export default ArticlesList;
