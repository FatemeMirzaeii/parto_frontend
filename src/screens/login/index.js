// import React, { useContext } from 'react';
// import { KeyboardAvoidingView, View } from 'react-native';
// import { Icon, Button } from 'react-native-elements';
// import { AuthContext } from '../../contexts';
// import LoginForm from './LoginForm';
// import styles from './styles';
// import Ptxt from '../../components/Ptxt';

// const Login = ({ navigation }) => {
//   const { signIn } = useContext(AuthContext);
//   return (
//     <KeyboardAvoidingView>
//       <Icon
//         name="close"
//         color="#f50"
//         containerStyle={styles.close}
//         size={30}
//         onPress={() => signIn('dummyToken')}
//       />
//       <LoginForm />
//       <View style={styles.login}>
//         <Ptxt>اگر هنوز ثبت نام نکرده اید،</Ptxt>
//         <Button
//           title="از اینجا وارد شوید."
//           titleStyle={styles.btnTitle}
//           type="clear"
//           onPress={() => {
//             navigation.navigate('SignUp');
//           }}
//         />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };
// export default Login;
import axios from 'axios';
import LottieView from 'lottie-react-native';
import React, { useContext, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Button ,Icon} from 'react-native-elements';
import Ptxt from '../../components/Ptxt';
import { AuthContext } from '../../contexts';
import { COLOR, HEIGHT, WIDTH } from '../../styles/static';
import styles from './styles';

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serverCode, setServerCode] = useState(0);
  const [serverError, setServerError] = useState(null);
  const { signUp } = useContext(AuthContext);
  const { signIn } = useContext(AuthContext);
  // useEffect(() => {
  //   getVerificationCode();
  // }, []);
  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      setBtnActive(true);
      Keyboard.dismiss();
    }
  };
  const handleSubmit = () => {};
  const getVerificationCode = async () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://api.parto.app/auth/verifyCode`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: phoneNumber,
      },
    })
      .then((res) => {
        console.log('res', res);
        setServerCode(res.data.code);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, err.response);
        // alert('error: ' + err);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else
          switch (err.response.status) {
            case 400:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            case 418:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            case 502:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
          }
      });
  };
  console.log('code', serverCode);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => signIn('dummyToken')}
      />
      <View style={styles.container}>
        <Ptxt style={styles.title}>به اپلیکیشن پرتو خوش آمدی!</Ptxt>
        <Ptxt style={styles.title}>برای ورود شماره موبایلت رو وارد کن:</Ptxt>
        <PhoneInput
          //ref={phoneInput}
          containerStyle={{
            width: WIDTH * 0.6,
            borderRadius: 10,
            alignSelf: 'center',
            margin: 20,
          }}
          textContainerStyle={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            marginLeft: -10,
          }}
          textInputStyle={styles.phoneInputTxt}
          codeTextStyle={styles.phoneInputTxt}
          placeholder="۹ - - - - - - - - -"
          defaultCode="IR"
          value={phoneNumber}
          onChangeText={_handlePhoneInput}
          // {(text) => {
          //   setPhoneNumber(text);
          //   phoneNumber.length === 9 ? setBtnActive(true) : null;
          // }}
          withShadow
          autoFocus
        />
        <Button
          title="ورود"
          disabled={!btnActive}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          onPress={getVerificationCode}
        />
        <Button
          title="ثبت‌نام"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
