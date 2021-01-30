import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Input, Button } from 'react-native-elements';

// components and store
import Card from '../../components/Card';
import { signUp } from '../../store/actions/auth';

// styles and images
import styles from './styles';
import MainAvatar from './../../../assets/images/main/avatar.png';
import PartnerAvatar from './../../../assets/images/partner/avatar.png';
import TeenagerAvatar from './../../../assets/images/teenager/avatar.png';
import { COLOR } from '../../styles/static';
import { removeData } from '../../util/func';

const UserAvatar = ({ navigation }) => {
  // const [name, setName] = useState();
  // const [isEditing, setIsEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.id) setIsRegistered(false);
  }, []);
  // const done = () => {
  //   db.exec(
  //     `INSERT INTO user (id, name) VALUES (2, '${name}')
  //                   ON CONFLICT(id) DO
  //                UPDATE SET name='${name}'`,
  //     'user',
  //   ).then((res) => {
  //     setIsEditing(false);
  //   });
  // };
  return (
    <View>
      {!isRegistered && (
        <TouchableOpacity
          style={styles.register}
          onPress={async () => {
            await removeData('@token');
            dispatch(signUp());
          }}>
          <Text style={[styles.text, { color: COLOR.white }]}>
            شما ثبت نام نکرده‌اید!{'\n'}برای ثبت همیشگی اطلاعاتتان ثبت نام کنید.
          </Text>
        </TouchableOpacity>
      )}
      <Avatar
        size="xlarge"
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
    </View>
    // <Card>
    //   {isEditing ? (
    //     <View style={styles.buttons}>
    //       <Button
    //         type="clear"
    //         title="لغو"
    //         onPress={() => {
    //           setIsEditing(false);
    //         }}
    //       />
    //       <Button type="clear" title="انجام" onPress={() => done()} />
    //     </View>
    //   ) : null}
    //   <Avatar
    //     rounded
    //     showEditButton
    //     size="large"
    //     icon={{ name: 'user', type: 'font-awesome' }}
    //     containerStyle={styles.avatar}
    //   />
    //   <TouchableOpacity
    //     onPress={() => {
    //       setIsEditing(true);
    //     }}>
    //     {isEditing ? (
    //       <Input value={name} onChangeText={setName} />
    //     ) : (
    //       <View style={styles.name}>
    //         <Text style={styles.text}>
    //           {name ? name : 'نام خود را وارد کنید.'}
    //         </Text>
    //       </View>
    //     )}
    //   </TouchableOpacity>
    // </Card>
  );
};
export default UserAvatar;
