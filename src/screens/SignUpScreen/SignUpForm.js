import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import styles from './Styles';
import { Icon, Input } from 'react-native-elements';
import { RESTAPI } from '../../Services/RESTAPI';
var restapi = new RESTAPI();

const SignUpForm = (props) => {
  const emailInput = useRef(null);
  const passInput = useRef(null);
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
      props.onSubmit();
    }
  };
  return (
    <View style={styles.container}>
      <Input
        label="نام"
        containerStyle={styles.input}
        returnKeyType="next"
        onSubmitEditing={(r) => {
          emailInput.current.focus();
        }}
        leftIcon={
          <Icon name="ios-woman" size={24} color="gray" type="ionicon" />
        }
        onChangeText={(value) => setName(value)}
      />
      <Input
        ref={emailInput}
        label="ایمیل"
        placeholder="example@example.com"
        onSubmitEditing={(r) => {
          passInput.current.focus();
        }}
        textContentType={'username'}
        containerStyle={styles.input}
        returnKeyType="next"
        leftIcon={
          <Icon name="ios-mail" size={24} color="gray" type="ionicon" />
        }
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        ref={passInput}
        label="رمز عبور"
        placeholder="*******"
        secureTextEntry={true}
        textContentType={'password'}
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
  );
};

export default SignUpForm;
