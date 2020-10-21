import axios from 'axios';
import { Icon } from 'native-base';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { AppTour, AppTourSequence } from 'react-native-app-tour';
import { Icon as IconElement } from 'react-native-elements';
import { storeData, getData } from '../../util/func';

//components
import Loader from '../../components/Loader';
import TreatiseIconBox from '../../components/TreatiseIconBox';
//import Error from '../../components/Error';

//services
import { authCode } from '../../services/authCode';
import { baseUrl } from '../../services/urls';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Treatise = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const [appTour, setAppTour] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'احکام',
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
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `${baseUrl}/rest/api/search?os_authType=basic&cql=(space.key=ahkam and type=page and label= "دسته‌بندی")order by created asc`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          setCategoryList(res.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          setServerError(error.toString());
          setIsLoading(false);
        });
    };

    getCategoryList();
  }, []);

  useEffect(() => {
    registerSequenceStepEvent();
    registerFinishSequenceEvent();
  }, []);
  useEffect(() => {
    checkIfAppTourIsNeeded();
  }, []);

  useEffect(() => {
    if (appTour) {
      let appTourSequence = new AppTourSequence();
      setTimeout(() => {
        appTourTargets.forEach((appTourTarget) => {
          appTourSequence.add(appTourTarget);
        });
        AppTour.ShowSequence(appTourSequence);
      }, 100);
      return () => clearTimeout(appTourSequence);
    }
  }, []);

  const checkIfAppTourIsNeeded = async () => {
    const a = await getData('HomeTourEnd');
    console.log('aaaa', a);
    setAppTour(a);
  };
  const registerSequenceStepEvent = () => {
    if (sequenceStepListener) {
      sequenceStepListener.remove();
    }

    const sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  const registerFinishSequenceEvent = () => {
    if (finishSequenceListener) {
      finishSequenceListener.remove();
    }
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      async (e: Event) => {
        console.log(e);
        console.log('appTourTargets.key', appTourTargets);
        const t=appTourTargets.filter((i)=>{i.key=='goCall'})
        console.log('t',t)
      //  if (appTourTargets.filter((i)=>{i.key.includes('goCall')}))
      //     await storeData('HomeTourEnd', 'true');
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* {serverError && (
        
          <Error message={serverError} />
        
      )} */}
      <TreatiseIconBox
        addAppTourTarget={(appTourTarget) => {
          appTourTargets.push(appTourTarget);
        }}
        callPress={() => Linking.openURL(`tel:${'+985132020'}`)}
        smsPress={() => Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`)}
        helpPress={() => navigation.navigate('TreatiseHelp')}
      />
      <View style={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {categoryList && (
              <FlatList
                data={categoryList}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('TreatiseList', {
                        catId: item.content.id,
                        catTitle: item.title,
                      })
                    }>
                    <View style={styles.buttonContent}>
                      <Text style={styles.txt}>{item.title}</Text>
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 60,
                          backgroundColor: '#64d7d6',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          type="Fontisto"
                          name="blood-drop"
                          style={styles.dropIcon}
                        />
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Treatise;
