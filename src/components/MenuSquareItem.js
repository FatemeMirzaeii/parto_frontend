import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

// styles
import { COLOR } from '../styles/static';
import globalStyles from '../styles';

const MenuSquareItem = ({ onPress, title, icon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon type="parto" name={icon} color={COLOR.icon} />
        <Text style={[globalStyles.listItemTitle, { textAlign: 'center' }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    elevation: 3,
    borderRadius: 25,
    padding: 10,
    width: 100,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
});
export default MenuSquareItem;
