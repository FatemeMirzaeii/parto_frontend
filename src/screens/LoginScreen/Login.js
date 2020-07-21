import React, { useContext } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { AuthContext } from '../../contexts/AuthContext';
import { getData, storeData } from '../../app/Functions';
import LoginForm from './LoginForm';
import styles from './Styles';

const Login = ({ navigation }) => {
  const { signIn, interview } = useContext(AuthContext);
  const navigateTo = async () => {
    const interviewed = await getData('@startPages');
    //await storeData('@token', 'dummyToken');
    interviewed ? signIn() : interview();
  };
  return (
    <KeyboardAvoidingView>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={navigateTo}
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
