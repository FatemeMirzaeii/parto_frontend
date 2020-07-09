import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from './Styles';

const UserProfile = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card wrapperStyle={styles.avatarContainer}>
        <Avatar
          rounded
          size="large"
          icon={{ name: 'user', type: 'font-awesome' }}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          containerStyle={styles.avatar}
        />
        <Text style={styles.text}>فاطمه میرزایی</Text>
      </Card>
    </TouchableOpacity>
  );
};
export default UserProfile;
