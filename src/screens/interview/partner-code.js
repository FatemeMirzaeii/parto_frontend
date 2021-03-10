import React, { useState } from 'react';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';

// components, utils and store
import { interview } from '../../store/actions/auth';
import api from '../../services/api';
import sync from '../../util/database/sync';
import Loader from '../../components/Loader';
import { handleTemplate } from '../../store/actions/user';
import { fetchInitialCycleData } from '../../store/actions/cycle';

// styles
import { COLOR, FONT, HEIGHT, WIDTH } from '../../styles/static';
import styles from './styles';
import Partner from '../../../assets/images/partner/interview.png';

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
      console.log('================res===================', res);
      if (resul) {
        setIsLoading(true);
        await sync();
        setIsLoading(false);
        dispatch(interview());
        dispatch(handleTemplate('Partner'));
        dispatch(fetchInitialCycleData());
      }
    }
  };

  return (
    <ImageBackground source={Partner} style={styles.bg}>
      <View style={{ flex: 1 }} />
      <SafeAreaView style={styles.safeAreaView}>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.textContainer}>
            <View style={styles.codeInpute}>
              <Input
                value={code}
                onChangeText={setCode}
                placeholder="PRT-XXXX"
                containerStyle={{ width: WIDTH / 2 }}
                inputStyle={{ fontFamily: FONT.medium }}
              />
            </View>
            <Button
              title="تایید"
              containerStyle={[styles.btnContainer, { top: HEIGHT / 9 }]}
              buttonStyle={[
                styles.nextButton,
                { backgroundColor: COLOR.partner },
              ]}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={verifyCode}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default PartnerCode;
