import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from './styles';

const TextScore = (props) => {
  return (
    <View style={styles.design}>
      <View style={styles.all2}>
        <Text style={styles.text3}>نقاط ضعف</Text>
        <Text style={styles.text3}>نقاط قوت</Text>
      </View>
      <View style={styles.line}>
        <Image source={require('../../../assets/images/mahdie/Line36.png')} />
      </View>
      <View style={styles.all2}>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={5}>
            برنامه اختلال داره و گاهی هنگ می کنه
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={4}>
            امکانات و تنوع خوبی داره
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.all2}>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={6}>
            با وجود وارد کردن اطلاعاتم باز هم محاسبه پرتو اشتباهه
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={2}>
            از پس تشخیص روزهای مهم دوره هام برمیاد
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.all2}>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={8}>
            طراحی برنامه قشنگ نیست
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Touch}>
          <Text style={styles.texting} id={3}>
            ظاهر پرتو جذاب و دوست داشتنیه
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.all2}>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={7}>
            کار کردن با پرتو برام سخته
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Touch} onPress={() => {}}>
          <Text style={styles.texting} id={1}>
            کار کردن با پرتو راحته
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder="نظرتان را یادداشت کنید" />
      </View>
    </View>
  );
};

export default TextScore;
