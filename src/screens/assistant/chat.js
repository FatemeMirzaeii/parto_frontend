import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';

// components and utils
import Loader from '../../components/Loader';
import api from '../../services/api';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const js = `
      window.addEventListener("goftino_ready", function () {
        window.ReactNativeWebView.postMessage('ready')
        });
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const checkCredit = () => {
    //calling api to get credit
    const credit = 0;
    if (credit > 0) {
      setHasEnaughCredit(true);
      // reduce credit.
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <WebView
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'ready') setIsLoading(false);
        }}
        injectedJavaScript={js}
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
