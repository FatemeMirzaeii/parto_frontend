import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR } from '../styles/static';

const Card = (props) => {
  return <View style={styles.card(props)}>{props.children}</View>;
};
Card.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
Card.defaultProps = {
  color: COLOR.white,
  children: <View />,
};
const styles = StyleSheet.create({
  card: (props) => ({
    backgroundColor: props.color,
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }),
});

export default Card;
