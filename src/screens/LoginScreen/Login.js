import React from 'react';
import {KeyboardAvoidingView, View, Text} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import LoginForm from './LoginForm';
import styles from './Styles';

const Login = ({navigation}) => {
  return (
    <KeyboardAvoidingView>
      <Icon
        name="ios-close"
        type="ionicon"
        color="#f50"
        containerStyle={styles.close}
        size={35}
        onPress={() => {
          navigation.navigate('StartQuestion');
        }}
      />
      <LoginForm
        onSubmit={() => {
          navigation.navigate('Home');
        }}
      />
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
