import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, Avatar, Input, Button } from 'react-native-elements';
import DataBase from '../../util/database';
import { AuthContext } from '../../contexts';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
const db = new DataBase();

const UserAvatar = ({ navigation }) => {
  const [name, setName] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const { signUp } = useContext(AuthContext);
  useEffect(() => {
    db.exec('SELECT id, name, email FROM user', 'user').then((n) => {
      if (n[0]) {
        if ((n.rows && n.rows === 'EMPTY_TABLE') || !n[0].email) {
          setIsRegistered(false);
        }
        setName(n[0].name);
      }
    });
  }, []);
  const done = () => {
    db.exec(
      `INSERT INTO user (id, name) VALUES (2, '${name}') 
                    ON CONFLICT(id) DO 
                 UPDATE SET name='${name}'`,
      'user',
    ).then((res) => {
      setIsEditing(false);
    });
  };
  return (
    <SafeAreaView>
      <Card>
        {isEditing ? (
          <View style={styles.buttons}>
            <Button
              type="clear"
              title="لغو"
              onPress={() => {
                setIsEditing(false);
              }}
            />
            <Button type="clear" title="انجام" onPress={() => done()} />
          </View>
        ) : null}
        <Avatar
          rounded
          showEditButton
          size="large"
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={styles.avatar}
        />
        <TouchableOpacity
          onPress={() => {
            setIsEditing(true);
          }}>
          {isEditing ? (
            <Input value={name} onChangeText={setName} />
          ) : (
            <View style={styles.name}>
              <Text style={styles.text}>
                {name ? name : 'نام خود را وارد کنید.'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {isRegistered ? null : (
          <TouchableOpacity style={styles.register} onPress={() => signUp()}>
            <Text style={[styles.text, { color: '#ffffff' }]}>
              شما ثبت نام نکرده اید!{'\n'}برای ثبت همیشگی اطلاعاتتان ثبت نام
              کنید.
            </Text>
          </TouchableOpacity>
        )}
      </Card>
    </SafeAreaView>
  );
};
export default UserAvatar;
