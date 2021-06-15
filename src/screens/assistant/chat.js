import React, { useState, useLayoutEffect, useEffect } from 'react';
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
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreditBox, setShowCreditBox] = useState();
  const userId = useSelector((state) => state.user.id);
  useEffect(() => {
    const res = checkCredit();
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
        break;
      case 'goftino_open':
        setShowCreditBox(!hasEnaughCredit);
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
  const checkCredit = async () => {
    //calling api to get credit and service price.
    const credit = await api({
      method: 'GET',
      url: `/payment/v1/credit/${userId}/fa`,
      dev: true,
    });
    if (!credit) return false;
    console.log('remaining', credit.data.data.remaining);
    if (credit.data.data.remaining > 0) {
      // todo: check with service price
      setHasEnaughCredit(true);
    }
    return true;
  };

  const creditDeduction = () => {
    //reduce credit
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <WebView
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
        injectedJavaScript={goftino}
        startInLoadingState
        renderLoading={() => {
          return <Loader />;
        }}
        // onError={() => navigation.pop()}
        renderError={() => (
          <View style={styles.error}>
            <Text>no internet connection</Text>
          </View>
        )}
      />
      {showCreditBox ? (
        <Button
          containerStyle={styles.newQuestionCont}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید."
          onPress={() => {
            if (hasEnaughCredit) creditDeduction();
            else navigation.navigate('Wallet');
          }}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default Chat;
