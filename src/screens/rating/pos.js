import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
const Ratings = () => {

  const [questionItems, setQuestionItems] = useState([]);
  const [pressStatus, setPressStatus] = useState(false);
  const [categroy, updateCategory] = useState([]);
  

  useEffect(() => {
    const getAnswer = () => {
      axios({
        method: 'post',
        url: `https://api.parto.app/survay/surveyQuestion/fa`,
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
          updateCategory(res.data.answers);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getAnswer();
  }, []);

  const _selectItems=(item)=>{
  
    setPressStatus(true)
    
  }

  const updateOnPress = (index) => {
    const categories = categroy.map((item) => {
      setPressStatus(true);
      return item;
    });
    categories[index].selected = true;
    updateCategory(categories);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
         data={questionItems}
        // data={categroy}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
          <TouchableOpacity
            key={item.id}
            // style={styles.GridViewContainer}
            style={pressStatus?styles.press:styles.GridViewContainer}
            // ref={(btn)=>{TouchableOpacity=btn}}
            //  onPress={ updateOnPress(index)}
           
          >
            <Text style={styles.GridViewTextLayout}> {item.answer}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Ratings;
