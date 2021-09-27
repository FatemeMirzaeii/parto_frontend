import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import commonStyles from '../../styles/index';

// components
import Card from '../../components/Card';

// styles and images
import styles from './styles';
import MainAvatar from './../../../assets/images/main/avatar.png';
import PartnerAvatar from './../../../assets/images/partner/avatar.png';
import TeenagerAvatar from './../../../assets/images/teenager/avatar.png';

const UserProfile = (props) => {
  const [isRegistered, setIsRegistered] = useState(true);
  // const [name, setName] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.id) setIsRegistered(false);
  }, []);
  return (
    <Card onPress={props.onPress}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            user.template === 'Main'
              ? MainAvatar
              : user.template === 'Partner'
              ? PartnerAvatar
              : TeenagerAvatar
          }
          style={[commonStyles.avatar, { width: 75, height: 75, margin: 0 }]}
          resizeMode="center"
        />
        <Text style={styles.text}>
          {isRegistered ? `0${user.phone}` : 'حساب کاربری بسازید!'}
          {'\n'}
        </Text>
      </View>
    </Card>
  );
};
export default UserProfile;
