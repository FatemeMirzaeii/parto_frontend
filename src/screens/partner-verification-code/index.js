import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, ToastAndroid, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Icon } from 'react-native-elements';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { signUp } from '../../store/actions/auth';

//components
import Loader from '../../components/Loader';
import Card from '../../components/Card';

//services
import api from '../../services/api';

//util
import { removeData } from '../../util/func';

//assets
import PartnerAvatar from './../../../assets/images/partner/avatar.png';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import commonStyles from '../../styles/index';

const PartnerVerificationCode = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کد همسر',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const getPartnerCode = async () => {
      if (userId) {
        const res = await api({
          url: `/user/partnerVerificationCode/${userId}/fa`,
          // dev: true,
        });
        if (res) setCode(res.data.data.partnerCode);
        setIsLoading(false);
      }
    };
    getPartnerCode();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Image
          source={PartnerAvatar}
          style={commonStyles.avatar}
          resizeMode="center"
        />
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
              جهت فعال شدن نسخه همسر خود، از کد زیر استفاده کنید:
            </Text>
            <View style={styles.codeWrapper}>
              <Text style={styles.code}>{code}</Text>
              <Icon
                type="materialicons"
                name="content-copy"
                color="#aaa"
                size={35}
                onPress={() => {
                  Clipboard.setString(code);
                  ToastAndroid.show('کد کپی شد.', ToastAndroid.LONG);
                }}
              />
            </View>
          </>
        )}
      </Card>
    </SafeAreaView>
  );
};

export default PartnerVerificationCode;
