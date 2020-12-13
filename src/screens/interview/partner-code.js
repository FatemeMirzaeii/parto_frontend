import React, { useEffect, useState } from 'react';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { FONT, HEIGHT, WIDTH } from '../../styles/static';
import styles from './styles';
import { devUrl } from '../../services/urls';
const PartenerCode = ({ route, navigation }) => {
  const [code, setCode] = useState();
  useEffect(() => {
    const verifyCode = async () => {
      try {
        const res = await axios({
          method: 'POST',
          url: `${devUrl}/auth/partnerVerificationCode/${user.id}/fa`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': await getData('@token'),
          },
          data: {
            partnerCode: code,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    verifyCode();
  }, []);

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
            onPress={() => navigation.replace('dkfjsk', { ...route.params })}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default PartenerCode;
