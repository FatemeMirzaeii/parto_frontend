import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FONT } from '../styles/static';

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        type="font-awesome-5"
        name="search"
        size={20}
        color={props.iconColor}
      />
      <TextInput
        style={styles.text}
        placeholder={props.undertxt}
        underlineColorAndroid="transparent"
        onChangeText={props.onChangeText}
      />
    </View>
  );
};
SearchBar.propTypes = {
  iconColor: PropTypes.string,
  undertxt: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  iconColor: '#aaa',
  undertxt: 'جستجو',
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 45,
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    flex: 1,
    paddingRight: 30,
    fontFamily: FONT.light,
  },

  icon: {
    padding: 10,
    paddingLeft: 20,
    margin: 3,
    marginTop: 6,
    height: 45,
    width: 50,
  },
});

export default SearchBar;
