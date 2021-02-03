// import axios from 'axios';
// import { Icon } from 'native-base';
// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import {
//   FlatList,
//   Linking,
//   SafeAreaView,
//   Text,
//   TouchableHighlight,
//   View,
//   ToastAndroid,
// } from 'react-native';
// import { Icon as IconElement } from 'react-native-elements';

// //components
// import Loader from '../../components/Loader';
// import TreatiseIconBox from '../../components/TreatiseIconBox';

// //services
// import { authCode } from '../../services/authCode';
// import { articlesBaseUrl } from '../../services/urls';

// //util
// import Tour from '../../util/tourGuide/Tour';

// //styles
// import { COLOR } from '../../styles/static';
// import styles from './styles';

// const Treatise = ({ navigation }) => {
//   const [categoryList, setCategoryList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [appTourTargets, setAppTourTargets] = useState([]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'احکام',
//       headerLeft: () => null,
//       headerRight: () => (
//         <IconElement
//           reverse
//           size={15}
//           name="arrow-right"
//           type="font-awesome"
//           color={COLOR.btn}
//           onPress={() => navigation.pop()}
//         />
//       ),
//     });
//   });

//   useEffect(() => {
//     const getCategoryList = () => {
//       axios({
//         method: 'get',
//         url: `${articlesBaseUrl}/rest/api/search?os_authType=basic&cql=(space.key=ahkam and type=page and label= "دسته‌بندی")order by created asc`,
//         headers: {
//           Authorization: 'Basic ' + authCode,
//           'X-Atlassian-Token': 'no-check',
//         },
//       })
//         .then((res) => {
//           setCategoryList(res.data.results);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           setIsLoading(false);
//           if (error.toString() === 'Error: Network Error')
//             ToastAndroid.show(
//               'لطفا اتصال اینترنت رو چک کن.',
//               ToastAndroid.LONG,
//             );
//         });
//     };

//     getCategoryList();
//   }, []);

//   Tour(appTourTargets, 'goCalls', 'TreatiseTour');

//   return (
//     <SafeAreaView style={styles.safeAreaView}>
//       <TreatiseIconBox
//         addAppTourTarget={(appTourTarget) => {
//           appTourTargets.push(appTourTarget);
//         }}
//         callPress={() => Linking.openURL(`tel:${'+985132020'}`)}
//         smsPress={() => Linking.openURL(`sms:${'+'}${9830002020}?body=${''}`)}
//         helpPress={() => navigation.navigate('TreatiseHelp')}
//       />
//       <View style={styles.main}>
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <>
//             {categoryList && (
//               <FlatList
//                 data={categoryList}
//                 renderItem={({ item }) => (
//                   <TouchableHighlight
//                     style={styles.button}
//                     onPress={() =>
//                       navigation.navigate('TreatiseList', {
//                         catId: item.content.id,
//                         catTitle: item.title,
//                       })
//                     }>
//                     <View style={styles.buttonContent}>
//                       <Text style={styles.txt}>{item.title}</Text>
//                       <View
//                         style={{
//                           width: 60,
//                           height: 60,
//                           borderRadius: 60,
//                           backgroundColor: '#64d7d6',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                         }}>
//                         <Icon
//                           type="Fontisto"
//                           name="blood-drop"
//                           style={styles.dropIcon}
//                         />
//                       </View>
//                     </View>
//                   </TouchableHighlight>
//                 )}
//                 keyExtractor={(item, index) => index.toString()}
//               />
//             )}
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Treatise;

import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';

//components
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/CatListLoader';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Treatise = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const counter = [1, 2, 3];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'احکام',
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

  return (
    <>
      {isLoading ? (
        counter.map((item) => <Loader key={item.toString()}>{item}</Loader>)
      ) : (
        <SafeAreaView style={styles.main}>
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryList
                treatise
                navigation={navigation}
                catId={item.content.id}
                catName={item.title}
                category={item.title}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Treatise;
