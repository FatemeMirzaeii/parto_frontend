import React from 'react';
import { Text } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from './Styles';

const UserAvatar = (props) => {
  return (
    <Card>
      <Avatar
        rounded
        showEditButton
        size="xlarge"
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
        containerStyle={styles.avatar}
      />
      <Text style={styles.text}>فاطمه میرزایی</Text>
    </Card>
  );
};
export default UserAvatar;
