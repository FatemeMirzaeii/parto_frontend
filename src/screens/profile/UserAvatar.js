import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Input, Button } from 'react-native-elements';
import Card from '../../components/Card';
import styles from './styles';
import { signUp } from '../../store/actions/auth';

const UserAvatar = ({ navigation }) => {
  // const [name, setName] = useState();
  // const [isEditing, setIsEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  useEffect(() => {
    if (!user) setIsRegistered(false);
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
          onPress={() => dispatch(signUp())}>
          <Text style={[styles.text, { color: '#ffffff' }]}>
            شما ثبت نام نکرده‌اید!{'\n'}برای ثبت همیشگی اطلاعاتتان ثبت نام کنید.
          </Text>
        </TouchableOpacity>
      )}
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
