import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR, SIZE, FONT, WIDTH, HEIGHT } from '../../styles/static';
const Stepper = () => {
  return (
    <View style={styles.v3q3}>
      <View style={[styles.stepper, { backgroundColor: COLOR.currentPage }]} />
      <View style={styles.stepper} />
      <View style={styles.stepper} />
      <View style={styles.stepper} />
    </View>
  );
};
const styles = StyleSheet.create({
  stepper: {
    width: WIDTH * 0.083,
    height: HEIGHT * 0.008,
    backgroundColor: COLOR.nextPage,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
export default Stepper;
