import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { COLOR, FONT } from '../styles/static';

const Card = (props) => {
  return (
    <View style={styles.container}>
      {props.hasHeader ? (
        <View style={styles.headerBox(props)}>
          <Text style={styles.headerTxt(props)}> {props.headerTitle}</Text>
        </View>
      ) : null}
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.card(props)}>{props.children}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};
Card.propTypes = {
  hasHeader: PropTypes.bool,
  headerTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
Card.defaultProps = {
  hasHeader: false,
  headerTitle: 'عنوان',
  color: COLOR.white,
  children: <View />,
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
  headerBox: (props) => ({
    backgroundColor: props.headerColor ?? props.color,
    top: 7,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3.1,
  }),
  card: (props) => ({
    backgroundColor: props.color,
    padding: 10,
    borderRadius: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  }),
  headerTxt: (props) => ({
    color: COLOR.listItemTxt,
    fontSize: 15,
    fontFamily: FONT.medium,
    textAlign: 'right',
    ...props.headerTxtStyle,
  }),
});

export default Card;
