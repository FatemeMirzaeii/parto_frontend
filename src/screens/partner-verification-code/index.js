import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Icon, Avatar } from 'react-native-elements';

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
      {!userId ? (
        <View style={styles.codeBox}>
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
        </View>
      ) : isLoading ? (
        <Loader />
      ) : (
        <Card>
          <Avatar
            size="xlarge"
            source={PartnerAvatar}
            imageProps={{ resizeMode: 'center' }}
            containerStyle={styles.avatar}
          />
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
        </Card>
      )}
    </SafeAreaView>
  );
};

export default PartnerVerificationCode;
