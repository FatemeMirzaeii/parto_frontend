import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = (props) => {
  return <View style={styles.divider(props)} />;
};

Divider.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
};

Divider.defaultProps = {
  height: 1,
  color: '#f1f1f1',
};

const styles = StyleSheet.create({
  divider: (props) => ({
    height: props.height,
    backgroundColor: props.color,
    justifyContent: 'center',
  }),
});

export default Divider;
