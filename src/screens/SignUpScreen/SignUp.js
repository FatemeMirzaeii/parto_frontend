import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import styles from './Styles';
import {Icon, Input, Button} from 'react-native-elements';
import {RESTAPI} from '../../hooks/RESTAPI';
var restapi = new RESTAPI();

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    console.log({
      name: name,
      email: email,
      password: password,
    });
    const res = await restapi.request('user/signUp/fa', {
      name: name,
      email: email,
      password: password,
    });
    if (res._status === 200) {
      navigation.navigate('StartQuestion');
    }
  };
  return (
    <SafeAreaView>
      <Icon
        name="ios-close"
        type="ionicon"
        color="#f50"
        containerStyle={styles.close}
        size={35}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <View style={styles.container}>
        <Input
          label="نام"
          containerStyle={styles.input}
          leftIcon={
            <Icon name="ios-woman" size={24} color="gray" type="ionicon" />
          }
          onChangeText={(value) => setName(value)}
        />
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
      <View style={styles.login}>
        <Text>عضو هستید؟</Text>
        <Button
          title="از اینجا وارد شوید."
          type="clear"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
