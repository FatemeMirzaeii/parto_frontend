import LottieView from 'lottie-react-native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { signIn } from '../../store/actions/auth';

//components
import Ptxt from '../../components/Ptxt';

//styles
import styles from './styles';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => dispatch(signIn('dummyToken'))}
      />
      <View style={styles.lottiewrapper}>
        <LottieView
          source={require('../../../assets/lotties/verification.json')}
          autoPlay
        />
      </View>
      <View style={styles.container}>
        <Ptxt style={styles.title}>به اپلیکیشن پرتو خوش آمدی!</Ptxt>
        <Button
          title="ورود"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <Button
          title="ثبت‌نام"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.buttonSecond}
          titleStyle={styles.btnSecondTitle}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
