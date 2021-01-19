import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';

// components
import Card from '../../components/Card';

// styles and images
import styles from './styles';
import MainAvatar from './../../../assets/images/main/avatar.png';
import PartnerAvatar from './../../../assets/images/partner/avatar.png';
import TeenagerAvatar from './../../../assets/images/teenager/avatar.png';

const UserProfile = (props) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [name, setName] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.id) setIsRegistered(false);
  }, []);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            source={
              user.template === 'Main'
                ? MainAvatar
                : user.template === 'Partner'
                ? PartnerAvatar
                : TeenagerAvatar
            }
            imageProps={{ resizeMode: 'center' }}
            containerStyle={styles.avatar}
          />
          <Text style={styles.text}>
            {isRegistered ? `0${user.phone}` : 'حساب کاربری بسازید!'}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
export default UserProfile;
