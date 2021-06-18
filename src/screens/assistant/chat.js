import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

// components and utils
import LocalScreen from './LocalScreen';
import Loader from '../../components/Loader';
import api from '../../services/api';
import { goftino } from './goftino';
import BackButton from '../../components/BackButton';
import DialogBox from '../../components/DialogBox';
import useModal from '../../util/hooks/useModal';

//styles
import globalStyles from '../../styles';
import styles from './styles';
import Coin from '../../../assets/images/wallet/coin.png';

const Chat = ({ navigation, route }) => {
  const [goftinoReady, setGoftinoReady] = useState(false);
  const [goftinoOpen, setGoftinoOpen] = useState(false);
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [credit, setCredit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(true);
  const [showCreditBox, setShowCreditBox] = useState();
  const userId = useSelector((state) => state.user.id);
  const { isVisible, toggle } = useModal();
  const ref = useRef();

  useEffect(() => {
    const price = getServicePrice();
    const res = checkCredit(price);
    // if(!res) khob chi?
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !goftinoOpen,
      title: '',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation, goftinoOpen]);

  const onMessage = (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        setGoftinoReady(true);
        break;
      case 'goftino_open':
        setGoftinoOpen(true);
        setShowCreditBox(true); //todo: check if user has open question or not
        break;
      case 'goftino_close':
        setGoftinoOpen(false);
        setShowCreditBox(false);
        break;
      // case value:
      //   break;
      default:
        alert(event.nativeEvent.data);
        break;
    }
  };

  const getServicePrice = async () => {
    const res = await api({
      method: 'GET',
      url: '/payment/services/1/price/fa',
      dev: true,
    });
    if (!res) return false;
    return res.data.data.amount;
  };

  const checkCredit = async (price) => {
    //calling api to get credit and service price.
    const cre = await api({
      method: 'GET',
      url: `/payment/v1/credit/${userId}/fa`,
      dev: true,
    });
    if (!cre) return false;
    console.log('remaining', cre.data.data.remaining);
    setCredit(cre.data.data.remaining);
    if (cre.data.data.remaining > price) {
      setHasEnaughCredit(true);
    }
    return true;
  };

  const creditDeduction = async () => {
    //reduce credit
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      dev: true,
      data: {
        serviceId: 1,
        method: 'wallet',
        discount: '0',
      },
    });
    if (!success) return false;
    return true;
  };
  return (
    <View style={styles.container}>
      {httpError && (
        <LocalScreen
          goftinoOpen={goftinoOpen}
          goftinoReady={goftinoReady}
          onPress={() => ref.current.injectJavaScript('Goftino.toggle();')}
        />
      )}
      <WebView
        ref={ref}
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
        injectedJavaScript={goftino}
        scalesPageToFit
        startInLoadingState
        renderLoading={() => {
          return <Loader />;
        }}
        onHttpError={(syntheticEvent) => {
          setHttpError(true);
          const { nativeEvent } = syntheticEvent;
          console.log('WebView received error status code: ', nativeEvent);
        }}
        onError={(e) => console.log(e)}
        renderError={(d, c, des) => {
          alert(c);
          return (
            <View style={styles.error}>
              <Text>no internet connection</Text>
            </View>
          );
        }}
      />
      {showCreditBox ? (
        <Button
          containerStyle={styles.newQuestionCont}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید."
          onPress={() => {
            let success;
            if (hasEnaughCredit) success = creditDeduction();
            else toggle();
            if (success) setShowCreditBox(false);
          }}
        />
      ) : null}
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        // icon={<Image source={Pay} resizeMode="center" />}
        text="اعتبار شما کافی نیست."
        firstBtnTitle="افزایش موجودی"
        firstBtnPress={() => {
          navigation.navigate('Wallet');
          toggle();
        }}
        firstBtnColor="orange">
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </DialogBox>
    </View>
  );
};

export default Chat;
