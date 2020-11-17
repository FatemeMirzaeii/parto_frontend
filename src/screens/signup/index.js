import React, {
  useRef,
  useState,
  Fragment,
  useContext,
  useEffect,
} from 'react';
import axios from 'axios';
import {
  ToastAndroid,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Ptxt from '../../components/Ptxt';
import DataBase from '../../util/database';
import styles from './styles';
import { api } from '../../services/api';
import { storeData } from '../../util/func';
import { AuthContext } from '../../contexts';
import { COLOR, HEIGHT } from '../../styles/static';

const SignUp = ({ navigation }) => {
  const restapi = new api();
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const { signUp } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serverCode, setServerCode] = useState(0);
  const [inputCode, setInputCode] = useState(0);

  useEffect(() => {
    const getVerificationCode = () => {
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
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getVerificationCode();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      <View style={{ height: HEIGHT / 2.5 }}>
        <LottieView
          source={require('../../../assets/lotties/verification.json')}
          autoPlay
          // enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
      <Ptxt style={styles.title}>برای ورود شماره موبایلت رو وارد کن:</Ptxt>
      <TextInput
        style={styles.phoneInput}
        underlineColorAndroid="transparent"
        placeholder="۹- - - - - - - - -"
        //keyboardType='phone-pad'
        textContentType="telephoneNumber"
        dataDetectorTypes="phoneNumber"
        keyboardType={'numeric'}
        placeholderTextColor="#aaa"
        // onFocus={() => this.setState({ mask: true })}
        // onChangeText={this._handleInput}
        value={phoneNumber}
        //secureTextEntry={true}
        //{(txt)=>this.setState({phoneNum:txt})}
        maxLength={10}
        //ref={(c) => this.refinput = c}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUp;
