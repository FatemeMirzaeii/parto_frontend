import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from './Styles';
import SignUpForm from './SignUpForm';
import { Icon } from 'react-native-elements';

const SignUp = ({ navigation }) => {
  return (
    <KeyboardAvoidingView>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => {
          navigation.pop();
        }}
      />
      <SignUpForm />
    </KeyboardAvoidingView>
  );
};

export default SignUp;
