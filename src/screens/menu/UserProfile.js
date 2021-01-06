import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import DataBase from '../../util/database';
import Card from '../../components/Card';
import styles from './styles';
import { View } from 'native-base';
const db = new DataBase();
const UserProfile = (props) => {
  const [name, setName] = useState('');
  useEffect(() => {
    db.exec('SELECT name FROM user', 'user').then((n) => {
      if (n[0]) {
        setName(n[0].name);
      }
    });
  });
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={styles.avatar}
          />
          <Text style={styles.text}>{name ? name : 'حساب کاربری بسازید!'}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
export default UserProfile;
