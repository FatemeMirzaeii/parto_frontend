import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const runFirst = `
      window.addEventListener("goftino_ready", function () {
        window.alert('👋 hiiiii')

        });
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <KeyboardAvoidingView style={styles.container}>
      <WebView
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // onMessage={(event) => {
        //   alert(event.nativeEvent.data);
        // }}
        injectedJavaScript={runFirst}
      />
      <Button
        containerStyle={styles.newQuestionCont(hasEnaughCredit)}
        buttonStyle={styles.newQuestion}
        titleStyle={styles.text}
        title="برای پرسیدن سوال جدید اینجا کلیک کنید"
        onPress={() => {
          setHasEnaughCredit(true);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;
