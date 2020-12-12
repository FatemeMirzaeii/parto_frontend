import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR } from '../../styles/static';
import { getUser } from '../../util/database/query';
import Loader from '../../components/Loader';
import styles from './styles';
import axios from 'axios';
import { getData } from '../../util/func';
import { devUrl } from '../../services/urls';

const PartnerVerificationCode = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [notRegistered, setNotRegistered] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کد همسر',
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const getPartnerCode = async () => {
      const userId = await checkIfRegistered();
      if (!notRegistered) {
        try {
          const res = await axios({
            method: 'GET',
            url: `${devUrl}/auth/partnerVerificationCode/${userId}/fa`,
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': await getData('@token'),
            },
          });
          setCode(res.data.data.partnerCode);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }
    };
    getPartnerCode();
  }, [notRegistered]);
  const checkIfRegistered = async () => {
    const usr = await getUser();
    setNotRegistered(usr ? false : true);
    return usr ? usr.id : -1;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.codeBox}>
        {isLoading ? (
          <Loader />
        ) : notRegistered ? (
          <View>
            <Text style={styles.title}>
              برای استفاده از نسخه همسر باید اول ثبت نام کنید.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>
              جهت فعال شدن نسخه همسر خود، از کد زیر استفاده کنید.
            </Text>
            <Text style={styles.code}>{code}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PartnerVerificationCode;
