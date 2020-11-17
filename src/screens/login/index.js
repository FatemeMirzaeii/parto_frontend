import React, { useContext } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { AuthContext } from '../../contexts';
import LoginForm from './LoginForm';
import styles from './styles';
import Ptxt from '../../components/Ptxt';

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
        <Ptxt>اگر هنوز ثبت نام نکرده اید،</Ptxt>
        <Button
          title="از اینجا وارد شوید."
          titleStyle={styles.btnTitle}
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
