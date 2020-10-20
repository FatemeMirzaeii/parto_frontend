import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = (props) => {
  return <View style={styles.divider(props)} />;
};

Divider.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

Divider.defaultProps = {
  width: '100%',
  height: 1,
  color: '#f1f1f1',
};

const styles = StyleSheet.create({
  divider: (props) => ({
    width: props.width,
    height: props.height,
    backgroundColor: props.color,
    justifyContent: 'center',
    alignSelf: 'center',
  }),
});

export default Divider;
