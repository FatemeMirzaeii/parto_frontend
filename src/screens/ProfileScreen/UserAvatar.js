import React from 'react';
import { Text } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from './Styles';

const UserAvatar = (props) => {
  return (
    <Card>
      <Avatar
        rounded
        size="xlarge"
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
        containerStyle={{
          backgroundColor: '#f1f1f1',
          elevation: 5,
          alignSelf: 'center',
          margin: 10,
        }}
      />
      <Text style={{ marginLeft: 15, alignSelf: 'center' }}>فاطمه میرزایی</Text>
    </Card>
  );
};
export default UserAvatar;
