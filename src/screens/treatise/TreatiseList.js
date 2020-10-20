import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

//components
import EmptyList from '../../components/EmptyList';
import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';

//services
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';

//util
import {RemoveHTML} from '../../util/func';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const TreatiseList = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const [rule, setRule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { catId, catTitle } = route.params;
  let ruleContent=[];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: catTitle,
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
    const getCategoryContent = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/content/${catId}/child/page/?expand=body.storage&depth=all`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          let con = [];
          ruleContent=[];
          console.log(res);
          console.log('categoryContent', res.data.results);
          con = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            console.log(res.data.results[i].id);
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
                console.log('response', response);
                const data = response.data.results;
                const imgUrl = [];
                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `${baseUrl}${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );
                }
                rule.push({
                  ...con[i],
                  cover: imgUrl[0],
                  images: imgUrl,
                  catId: catId,
                });
                setIsLoading(false);
                setData(rule);
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
    setData(rule);
    const result = rule.filter((i) => {
      return i.title.includes(text) || RemoveHTML (i.body.storage.value).includes(text)
    });
   
    console.log('result', result);
    setData(result);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ flex: 1, paddingBottom: 50 }}>
          <SearchBar
            undertxt="جستجو"
            onChangeText={_handleSearch}
            iconColor={COLOR.btn}
          />
          <View
            style={{ flex: 1 }}>
            <FlatList
              data={data}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => {
                return <EmptyList />;
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.GridViewContainer}
                  onPress={() =>
                    navigation.navigate('TreatiseDetails', {
                      treatiseContent: item,
                    })
                  }>
                  <Text style={styles.GridViewTextLayout}> {item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default TreatiseList;
