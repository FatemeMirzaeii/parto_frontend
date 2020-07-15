import React, { useRef, useState, Fragment } from 'react';
import { ToastAndroid, View, Text, ActivityIndicator } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './Styles';
import { RESTAPI } from '../../services/RESTAPI';
import { storeData } from '../../app/Functions';

const LoginForm = (props) => {
  const restapi = new RESTAPI();
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    const res = await restapi.request('auth/signIn/fa', values);
    console.log(res);
    if (res._status === 200) {
      await storeData('@token', res._token);
      props.onSubmit();
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
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => submit(values)}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('ایمیل وارد شده معتبر نیست.')
              .required('لطفا ایمیل خود را وارد کنید.'),
            password: yup.string().required('لطفا رمزعبور خود را وارد کنید.'),
          })}>
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
                label="ایمیل"
                placeholder="example@example.com"
                onSubmitEditing={(r) => {
                  passInput.current.focus();
                }}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                textContentType={'username'}
                containerStyle={styles.input}
                returnKeyType="next"
                leftIcon={
                  <Icon name="ios-mail" size={24} color="gray" type="ionicon" />
                }
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <Input
                value={values.password}
                ref={passInput}
                label="رمز عبور"
                placeholder="*******"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                textContentType={'password'}
                containerStyle={styles.input}
                leftIcon={
                  <Icon name="ios-lock" size={24} color="gray" type="ionicon" />
                }
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <Icon
                raised
                onPress={handleSubmit}
                name="ios-checkmark"
                type="ionicon"
                color="#f50"
                size={35}
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
