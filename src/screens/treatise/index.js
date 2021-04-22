import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ToastAndroid,
  Linking,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';

//components
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/CatListLoader';
import TreatiseIconBox from '../../components/TreatiseIconBox';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//util
import Tour from '../../util/tourGuide/Tour';

//assets
import estehazeImg from '../../../assets/images/treatise/estehaze.png';

//styles
import { COLOR, WIDTH } from '../../styles/static';
import styles from './styles';

const Treatise = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const counter = [1, 2, 3];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'احکام',
      headerLeft: () => (
        <TreatiseIconBox
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
          callPress={() => Linking.openURL(`tel:${'+985132020'}`)}
          smsPress={() => Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`)}
          helpPress={() => navigation.navigate('TreatiseHelp')}
        />
      ),
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
    const getCategoryList = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=ahkam and type=page and label= "دسته‌بندی")order by created asc`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'X-Atlassian-Token': 'no-check',
          },
        });

        if (!isCancelled) {
          setCategoryList(res.data.results);
        }
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        }
      }
      setIsLoading(false);
    };

    getCategoryList();
    return () => {
      isCancelled = true;
    };
  }, []);

  Tour(appTourTargets, 'goCalls', 'TreatiseTour');

  return (
    <>
      {isLoading ? (
        counter.map((item) => <Loader key={item.toString()}>{item}</Loader>)
      ) : (
        <SafeAreaView style={styles.main}>
          <FlatList
            data={categoryList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ImageBackground
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  width: WIDTH - 10,
                  marginVertical: 15,
                }}
                imageStyle={{
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                }}
                source={estehazeImg}>
                <CategoryList
                  treatise
                  navigation={navigation}
                  catId={item.content.id}
                  catName={item.title}
                  category={item.title}
                />
              </ImageBackground>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Treatise;
