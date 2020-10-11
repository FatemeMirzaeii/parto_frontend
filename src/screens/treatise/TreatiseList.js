import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon as IconElement } from 'react-native-elements';
import EmptyList from '../../components/EmptyList';
import Loader from '../../components/Loader';
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';
import { COLOR, FONT } from '../../styles/static';

const TreatiseList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [rule, setRule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { catId, catTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: catTitle,
      headerLeft: () => null,
      headerRight: () => (
        <IconElement
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
                //setRule([])
                for (let i = 0; i < data.length; i++) {
                  imgUrl.push(
                    `${baseUrl}${
                      data[i]._links.download.split('?')[0]
                    }?os_authType=basic`,
                  );

                  console.log('imgUrl', imgUrl);
                }
                rule.push({
                  ...con[i],
                  cover: imgUrl[0],
                  images: imgUrl,
                  catId: catId,
                });
                setIsLoading(false);
                setData(rule);
                console.log('imgUrl', imgUrl);
                console.log('new', rule);
              })
              .catch((err) => {
                console.error(err, err.response);
                // if (err.response && err.response.data) {
                //   setServerError(err.response.data.message)
                // }
              });
          }
        })

        .catch((err) => {
          console.error(err, err.response);
        });
    };
    getCategoryContent();
  }, [catId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ flex: 1, paddingBottom: 50 }}>
          <View
            // source={require('../../../assets/images/start/4.png')}
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

const styles = StyleSheet.create({
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  GridViewTextLayout: {
    fontSize: 15,
    fontFamily: FONT.medium,
    justifyContent: 'center',
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  linearGradient: {
    height: 180,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TreatiseList;
