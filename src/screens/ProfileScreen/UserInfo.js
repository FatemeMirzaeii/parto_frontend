import React from 'react';
import { Text } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from './Styles';

const UserInfo = ({ navigation }) => {
  return (
    <Card
    //title="فاطمه میرزایی"
    //image={require('../images/pic2.jpg')}
    >
      <Avatar
        rounded
        showEditButton
        size="xlarge"
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
        activeOpacity={0.7}
        onPress={() => console.log('Works!')}
        containerStyle={{
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
          elevation: 5,
        }}
      />
      <Text style={{ margin: 10, alignSelf: 'center' }}>فاطمه میرزایی</Text>
    </Card>
  );
};
export default UserInfo;
