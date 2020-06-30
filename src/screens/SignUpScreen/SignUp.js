import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from './Styles';
import SignUpForm from './SignUpForm';
import { Icon } from 'react-native-elements';

const SignUp = ({ navigation }) => {
  return (
    <KeyboardAvoidingView>
      <Icon
        name="ios-close"
        type="ionicon"
        color="#f50"
        containerStyle={styles.close}
        size={40}
        onPress={() => {
          navigation.navigate('StartQuestion');
        }}
      />
      <SignUpForm
        onSubmit={() => {
          navigation.navigate('StartQuestion');
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUp;
