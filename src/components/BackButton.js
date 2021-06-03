import React from 'react';
import { Icon } from 'react-native-elements';
import { COLOR } from '../styles/static';

const BackButton = ({ navigation }) => {
  return (
    <Icon
      size={16}
      name="right-arrow"
      type="parto"
      color={COLOR.icon}
      onPress={() => navigation.pop()}
      containerStyle={{ right: 25 }}
    />
  );
};
export default BackButton;
