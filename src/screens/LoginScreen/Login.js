import React from 'react';
import {KeyboardAvoidingView, View, Text} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {getData} from '../../app/Functions';
import LoginForm from './LoginForm';
import styles from './Styles';

const Login = ({navigation}) => {
  const login = async () => {
    const interviewed = await getData('@startPages');
    interviewed
      ? navigation.navigate('Home')
      : navigation.navigate('StartQuestion');
  };
  return (
    <KeyboardAvoidingView>
      <Icon
        name="ios-close"
        type="ionicon"
        color="#f50"
        containerStyle={styles.close}
        size={40}
        onPress={login}
      />
      <LoginForm onSubmit={login} />
      <View style={styles.login}>
        <Text>اگر هنوز ثبت نام نکرده اید،</Text>
        <Button
          title="از اینجا وارد شوید."
          type="clear"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
