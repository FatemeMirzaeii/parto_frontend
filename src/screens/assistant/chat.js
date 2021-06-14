import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Button } from 'react-native-elements';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

// components and utils
import Loader from '../../components/Loader';
import api from '../../services/api';
import { goftino } from './goftino';
import BackButton from '../../components/BackButton';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  const [goftinoReady, setGoftinoReady] = useState(false);
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [showCreditBox, setShowCreditBox] = useState();
  const userId = useSelector((state) => state.user.id);
  const ref = useRef();
  useEffect(() => {
    const price = getServicePrice();
    const res = checkCredit(price);
    // if(!res) khob chi?
    setIsLoading(false);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);
  const onMessage = (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        setGoftinoReady(true);
        break;
      case 'goftino_open':
        setShowCreditBox(true); //todo: check if user has open question or not
        break;
      case 'goftino_close':
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
      url: `/payment/v1/${userId}/services/1/amount/fa`,
      dev: true,
    });
    if (!res) return false;
    return res.data.data.amount;
  };

  const checkCredit = async (price) => {
    //calling api to get credit and service price.
    const credit = await api({
      method: 'GET',
      url: `/payment/v1/credit/${userId}/fa`,
      dev: true,
    });
    if (!credit) return false;
    console.log('remaining', credit.data.data.remaining);
    if (credit.data.data.remaining > price) {
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
    // console.log('remaining', credit.data.data.remaining);
    return true;
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      {httpError && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            width: '100%',
            height: '100%',
            position: 'absolute',
            // zIndex: 10,
          }}>
          <Text>yohhhoooooooooo</Text>
        </View>
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
            else navigation.navigate('Wallet');
            if (success) setShowCreditBox(false);
          }}
        />
      ) : null}
      {goftinoReady && (
        <Button
          // containerStyle={styles.newQuestionCont}
          // buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="چت"
          onPress={() => {
            ref.current.injectJavaScript('Goftino.toggle();');
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Chat;
