import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { COLOR } from '../../styles/static';
import Loader from '../../components/Loader';
import styles from './styles';
import api from '../../services/api';
import { signUp } from '../../store/actions/auth';
import { removeData } from '../../util/func';

const PartnerVerificationCode = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
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
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const getPartnerCode = async () => {
      if (userId) {
        const res = await api({
          url: `/user/partnerVerificationCode/${userId}/fa`,
          dev: true,
        });
        if (res) setCode(res.data.data.partnerCode);
        setIsLoading(false);
      }
    };
    getPartnerCode();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.codeBox}>
        {!userId ? (
          <>
            <Text style={styles.title}>
              برای استفاده از نسخه همسر ابتدا باید ثبت‌نام کنید.
            </Text>
            <Button
              title="ثبت‌نام"
              onPress={async () => {
                await removeData('@token');
                dispatch(signUp());
              }}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
            />
          </>
        ) : isLoading ? (
          <Loader />
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
