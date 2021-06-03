import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';

// components and utils
import Loader from '../../components/Loader';
import api from '../../services/api';
import { goftino } from './goftino';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onMessage = (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        break;
      case 'goftino_open':
        setIsLoading(false);
        break;
      case 'goftino_close':
        setIsLoading(true); // todo: should find a better way for this
        break;
      // case value:
      //   break;

      default:
        alert(event.nativeEvent.data);
        break;
    }
  };
  const checkCredit = () => {
    //calling api to get credit and service price.
    const credit = 20;
    if (credit > 0) {
      // if credit>=service price
      setHasEnaughCredit(true);
      // reduce credit.
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <WebView
        containerStyle={{ flex: 12 }}
        source={{ uri: 'https://test.parto.app' }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
        injectedJavaScript={goftino}
        startInLoadingState
        renderLoading={() => {
          return <Loader />;
        }}
      />
      {isLoading ? null : (
        <Button
          containerStyle={styles.newQuestionCont(hasEnaughCredit)}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید"
          onPress={() => {
            checkCredit();
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Chat;
