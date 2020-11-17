import React, { useRef, useState, Fragment, useContext } from 'react';
import { ToastAndroid, View, Text, ActivityIndicator } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';
import { api } from '../../services/api';
import { storeData } from '../../util/func';
import { AuthContext } from '../../contexts';
import Ptxt from '../../components/Ptxt';
import Loader from  '../../components/Loader';
import { COLOR, SIZE, FONT, WIDTH, HEIGHT } from '../../styles/static';

const LoginForm = (props) => {
  const restapi = new api();
  const { signIn } = useContext(AuthContext);
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const submit = async (values) => {
    setLoading(true);
    const res = await restapi.request('auth/signIn/fa', values, 'POST', true);
    console.log(res);
    if (res._status === 200) {
      await storeData('@token', res._token);
      await storeData('@email', values.email);

      signIn();
    } else {
      if (res._status === 502 || res._status === null) {
        ToastAndroid.show('اتصال اینترنت خود را چک کنید.', ToastAndroid.LONG);
        setLoading(false);
      } else {
        ToastAndroid.show(res._data.message, ToastAndroid.LONG);
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          // initialValues={{ email: '', password: '', phone: '' }}
          initialValues={{ phone: '' }}
          onSubmit={(values) => submit(values)}
          // validationSchema={yup.object().shape({
          //   email: yup
          //     .string()
          //     .email('ایمیل وارد شده معتبر نیست.')
          //     .required('لطفا ایمیل خود را وارد کنید.'),
          //   password: yup.string().required('لطفا رمزعبور خود را وارد کنید.'),
          // })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <Input
                ref={emailInput}
                value={values.email}
                label="تلفن"
                placeholder="0912123456"
                onSubmitEditing={(r) => {
                  passInput.current.focus();
                }}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                textContentType={'username'}
                //containerStyle={styles.input}
                returnKeyType="next"
                leftIcon={<Icon name="phone" size={20} color="gray" />}
              />
              {/* <Input
                ref={emailInput}
                value={values.email}
                label="ایمیل"
                placeholder="example@example.com"
                onSubmitEditing={(r) => {
                  passInput.current.focus();
                }}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                textContentType={'username'}
                //containerStyle={styles.input}
                returnKeyType="next"
                leftIcon={<Icon name="mail" size={20} color="gray" />}
              />
              {touched.email && errors.email && (
                <Ptxt style={styles.error}>{errors.email}</Ptxt>
              )}
              <Input
                value={values.password}
                ref={passInput}
                label="رمز عبور"
                placeholder="*******"
                secureTextEntry={securePassword}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                textContentType={'password'}
                //containerStyle={styles.input}
                leftIcon={<Icon name="lock" size={20} color="gray" />}
                rightIcon={
                  <Icon
                    name={securePassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="gray"
                    onPress={() => setSecurePassword(!securePassword)}
                  />
                }
              /> */}
              {touched.password && errors.password && (
                <Ptxt style={styles.error}>{errors.password}</Ptxt>
              )}
              <Icon
                raised
                onPress={handleSubmit}
                name="check"
                color={COLOR.tiffany}
                size={30}
                disabled={!isValid}
                containerStyle={styles.button}
              />
            </Fragment>
          )}
        </Formik>
      )}
    </View>
  );
};
export default LoginForm;
