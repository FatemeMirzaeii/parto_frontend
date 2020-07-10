import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, Avatar, Input, Button } from 'react-native-elements';
import DataBase from '../../components/Database';
import styles from './Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
const db = new DataBase();

const UserAvatar = (props) => {
  const [name, setName] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  useEffect(() => {
    db.rawQuery('SELECT name FROM user').then((n) => {
      if ((n.rows && n.rows === 'EMPTY_TABLE') || !n[0].email) {
        setIsRegistered(false);
      }
      setName(n[0].name);
    });
  }, []);
  const done = () => {
    setIsEditing(false);
    db.rawQuery(
      `INSERT INTO user (id, name) VALUES (1, '${name}') 
                    ON CONFLICT(id) DO 
                 UPDATE SET name='${name}'`,
      'user',
    );
  };
  return (
    <SafeAreaView>
      {isRegistered ? null : (
        <View style={styles.register}>
          <Text style={[styles.text, { color: '#ffffff' }]}>
            شما ثبت نام نکرده اید!{'\n'}برای ثبت همیشگی اطلاعاتتان ثبت نام کنید.
          </Text>
        </View>
      )}
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
          size="xlarge"
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
      </Card>
    </SafeAreaView>
  );
};
export default UserAvatar;
