import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';

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
import commonStyles from '../../styles/index';

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
      <Image
        source={
          user.template === 'Main'
            ? MainAvatar
            : user.template === 'Partner'
            ? PartnerAvatar
            : TeenagerAvatar
        }
        style={commonStyles.avatar}
        resizeMode="center"
      />
      {!isRegistered && (
        <View style={styles.box}>
          <Text style={[styles.text, { color: COLOR.black }]}>
            شما ثبت نام نکرده‌اید!{'\n\n'}برای ثبت همیشگی اطلاعاتتان ثبت نام
            کنید.
          </Text>
          <Button
            title="ثبت‌نام"
            onPress={async () => {
              await removeData('@token');
              dispatch(signUp());
            }}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
          />
        </View>
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
