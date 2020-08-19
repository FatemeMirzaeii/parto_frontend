import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONT } from '../styles/static';
const Ptxt = (props) => {
  return <Text style={[styles.font, props.style]}>{props.children}</Text>;
};
const styles = StyleSheet.create({
  font: {
    fontFamily: FONT.regular,
  },
});
export default Ptxt;
