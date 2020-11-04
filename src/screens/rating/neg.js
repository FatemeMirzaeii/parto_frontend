import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
const Ratings = () => {
  const [questionItems, setQuestionItems] = useState([]);

  // useEffect(() => {
  //   const getAnswer = () => {
  //     axios({
  //       method: 'post',
  //       url: `https://api.parto.app/survay/surveyQuestion/fa`,
  //       data: {
  //         IMEi: '123456789123456',
  //       },
  //       // headers: {
  //       //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //       // },
  //     })
  //       .then((res) => {
  //         console.log('res', res);
  //         console.log('res', res.data.answers);
  //         setQuestionItems(res.data.answers);
  //       })
  //       .catch((err) => {
  //         console.error(err, err.response);
  //       });
  //   };

  //   getAnswer();
  // }, []);

  useEffect(() => {
    const getAnswer = () => {
      axios({
        //method: 'post',
        method: 'get',
        // url: `https://api.parto.app/survay/surveyQuestion/fa`,
        url: `https://api.parto.app/survey/question/fa`,
        
        // data: {
        //   IMEi: '123456789123456',
        // },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        // },
      })
        .then((res) => {
          console.log('resneg', res);
          console.log('res', res.data.negativeQuestion);
          setQuestionItems(res.data.negativeQuestion);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getAnswer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={questionItems}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.GridViewContainer}
            // onPress={() =>
            //   navigation.navigate('TreatiseDetails', {
            //     treatiseContent: item,
            //   })
            // }
          >
            <Text style={styles.GridViewTextLayout}> {item.question}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Ratings;
