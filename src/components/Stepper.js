import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR } from '../styles/static';
const Stepper = ({ index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepper(1, index)} />
      <View style={styles.stepper(2, index)} />
      <View style={styles.stepper(3, index)} />
      <View style={styles.stepper(4, index)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: 'row-reverse', alignSelf: 'center' },
  stepper: (stepperKey, index) => ({
    width: 8,
    height: 8,
    backgroundColor: stepperKey <= index ? COLOR.pink : COLOR.nextPage,
    borderRadius: 50,
    marginHorizontal: 5,
  }),
});
export default Stepper;
