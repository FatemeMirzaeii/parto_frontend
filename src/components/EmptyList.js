import { Icon } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT } from '../styles/static';
const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}> متاسفم! جستجو نتیجه‌ای نداشت.</Text>
      <Icon type="Entypo" name="emoji-sad" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 30,
  },
  txt: {
    marginTop: 5,
    fontFamily: FONT.light,
    color: 'grey',
  },
  icon: {
    color: 'grey',
  },
});

export default EmptyList;
