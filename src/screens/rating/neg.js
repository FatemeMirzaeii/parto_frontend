import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
const Ratings = () => {
  const [questionItems, setQuestionItems] = useState([]);

  useEffect(() => {
    const getAnswer = () => {
      axios({
        method: 'post',
        url: `https://api.partobanoo.com/survay/surveyQuestion/fa`,
        data: {
          IMEi: '123456789123456',
        },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        // },
      })
        .then((res) => {
          console.log('res', res);
          console.log('res', res.data.answers);
          setQuestionItems(res.data.answers);
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
            <Text style={styles.GridViewTextLayout}> {item.answer}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Ratings;
