import React, { useRef, useState, Fragment, useContext } from 'react';
import { ToastAndroid, View, Text, ActivityIndicator } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import DataBase from '../../util/database';
import styles from './styles';
import { api } from '../../services/api';
import { storeData } from '../../util/func';
import { AuthContext } from '../../contexts/AuthContext';
const db = new DataBase();

const SignUpForm = (props) => {
  const restapi = new api();
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const { signUp } = useContext(AuthContext);

  const submit = async (values) => {
    setLoading(true);
    const res = await restapi.request('user/signUp/fa', values);
    if (res._status === 200) {
      await storeData('@token', res._token);
      db.rawQuery(
        `INSERT INTO user (name,email) VALUES ('${values.name}','${values.email}')`,
        'user',
      );
      signUp();
    } else {
      if (res._status === 502 || res._status === null) {
        console.log(res._status);
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
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values) => submit(values)}
          validationSchema={yup.object().shape({
            name: yup.string().required('لطفا نام خود را وارد کنید.'),
            email: yup
              .string()
              .email('ایمیل وارد شده معتبر نیست.')
              .required('لطفا ایمیل خود را وارد کنید.'),
            password: yup
              .string()
              .min(8, 'رمز عبور حداقل باید 8 کاراکتر باشد.')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                'رمز عبور باید دارای یک حرف کوچک، یک حرف بزرگ و یک عدد باشد.',
              )
              // .matches(/^(?=.*[a-z])/, 'رمز عبور باید دارای حروف کوچک باشد.')
              // .matches(/^(?=.*[A-Z])/, 'رمز عبور باید دارای حروف بزرگ باشد.')
              // .matches(/^(?=.*[0-9])/, 'رمز عبور باید حاوی اعداد باشد.')
              .required('لطفا رمز عبور خود را وارد کنید.'),
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
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <Input
                value={values.name}
                label="نام"
                containerStyle={styles.input}
                returnKeyType="next"
                onSubmitEditing={(r) => {
                  emailInput.current.focus();
                }}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                leftIcon={<Icon name="person" size={20} color="gray" />}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
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
                leftIcon={<Icon name="mail" size={20} color="gray" />}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
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
                containerStyle={styles.input}
                leftIcon={<Icon name="lock" size={20} color="gray" />}
                rightIcon={
                  <Icon
                    name={securePassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="gray"
                    onPress={() => setSecurePassword(!securePassword)}
                  />
                }
              />

              <Icon
                raised
                onPress={handleSubmit}
                name="check"
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

export default SignUpForm;
