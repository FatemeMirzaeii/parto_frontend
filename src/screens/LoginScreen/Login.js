import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './Styles';
import {Icon, Input} from 'react-native-elements';
import {RESTAPI} from '../../hooks/RESTAPI';
var restapi = new RESTAPI();

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    console.log({
      email: email,
      password: password,
    });
    const res = await restapi.request('auth/signIn/fa', {
      email: email,
      password: password,
    });
    console.log(res);
    if (res._status === 200) {
      navigation.navigate('Home');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Input
          label="ایمیل"
          placeholder="example@example.com"
          containerStyle={styles.input}
          leftIcon={
            <Icon name="ios-mail" size={24} color="gray" type="ionicon" />
          }
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          label="رمز عبور"
          placeholder="*******"
          containerStyle={styles.input}
          leftIcon={
            <Icon name="ios-lock" size={24} color="gray" type="ionicon" />
          }
          onChangeText={(value) => setPassword(value)}
        />
        <Icon
          raised
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          containerStyle={styles.button}
          onPress={submit}
        />
      </View>
    </SafeAreaView>
  );
};
export default Login;
