import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import styles from './Styles';
import {RESTAPI} from '../../hooks/RESTAPI';
import {Icon, Input} from 'react-native-elements';
const restapi = new RESTAPI();

const LoginForm = (props) => {
  const emailInput = useRef(null);
  const passInput = useRef(null);
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
      props.onSubmit;
    }
  };
  return (
    <View style={styles.container}>
      <Input
        ref={emailInput}
        label="ایمیل"
        placeholder="example@example.com"
        onSubmitEditing={(r) => {
          // validate({
          //   email: {email: true},
          // });
          passInput.current.focus();
        }}
        textContentType={email}
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
        onSubmitEditing={(r) => {
          // validate({
          //   password: {minlength: 8},
          // });
        }}
        textContentType={password}
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
export default LoginForm;
