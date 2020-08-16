import React, { useContext } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { AuthContext } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import styles from './styles';

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  return (
    <KeyboardAvoidingView>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => signIn('dummyToken')}
      />
      <LoginForm />
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
