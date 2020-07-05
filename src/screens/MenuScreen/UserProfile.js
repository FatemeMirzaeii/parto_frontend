import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from './Styles';

const UserProfile = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card wrapperStyle={{ flexDirection: 'row' }}>
        <Avatar
          rounded
          size="large"
          icon={{ name: 'user', type: 'font-awesome' }}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          containerStyle={{
            backgroundColor: '#f1f1f1',
            elevation: 5,
          }}
        />
        <Text style={{ marginLeft: 15, alignSelf: 'center' }}>
          فاطمه میرزایی
        </Text>
      </Card>
    </TouchableOpacity>
  );
};
export default UserProfile;
