import React, { useState } from 'react';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { FONT, HEIGHT, WIDTH } from '../../styles/static';
import styles from './styles';
import { interview } from '../../store/actions/auth';
import api from '../../services/api';
import sync from '../../util/database/sync';
import Loader from '../../components/Loader';
import { handleTemplate } from '../../store/actions/user';
import { fetchInitialCycleData } from '../../store/actions/cycle';

const PartnerCode = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState();
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const verifyCode = async () => {
    const res = await api({
      method: 'POST',
      url: `/user/partnerVerificationCode/${userId}/fa`,
      data: {
        partnerCode: code,
      },
      dev: true,
    });
    if (res) {
      const resul = await api({
        method: 'POST',
        url: `/user/versionType/${userId}/fa`,
        dev: true,
        data: { type: 'Partner' },
      });
      if (resul) {
        setIsLoading(true);
        await sync();
        setIsLoading(false);
        dispatch(interview());
        dispatch(handleTemplate(res.data.data.type));
        dispatch(fetchInitialCycleData());
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/5.png')}
        style={styles.bg}>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.textContainer}>
            <View
              style={{
                elevation: 2,
                borderRadius: 60,
                width: WIDTH * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Input
                value={code}
                onChangeText={setCode}
                placeholder="PRT-1234"
                containerStyle={{ width: WIDTH / 2 }}
                inputStyle={{ fontFamily: FONT.medium }}
              />
            </View>
            <Button
              title="تایید"
              containerStyle={[styles.btnContainer, { top: HEIGHT / 6 }]}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={verifyCode}
            />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default PartnerCode;
