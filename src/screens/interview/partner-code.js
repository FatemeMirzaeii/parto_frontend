import React, { useEffect, useState } from 'react';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { FONT, HEIGHT, WIDTH } from '../../styles/static';
import styles from './styles';
import { devUrl } from '../../services/urls';
import { getData } from '../../util/func';
const PartenerCode = ({ route, navigation }) => {
  const [code, setCode] = useState();
  const userId = useSelector((state) => state.user.id);

  const verifyCode = async () => {
    try {
      console.log('userId', userId);
      // const res = await axios({
      //   method: 'POST',
      //   url: `${devUrl}/auth/partnerVerificationCode/${userId}/fa`,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'x-auth-token': await getData('@token'),
      //   },
      //   data: {
      //     partnerCode: code,
      //   },
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/5.png')}
        style={styles.bg}>
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
      </ImageBackground>
    </SafeAreaView>
  );
};
export default PartenerCode;
