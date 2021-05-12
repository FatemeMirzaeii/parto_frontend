import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
      />
      <Button
        containerStyle={styles.newQuestionCont(hasEnaughCredit)}
        buttonStyle={styles.newQuestion}
        titleStyle={styles.listItemText}
        title="برای پرسیدن سوال جدید اینجا کلیک کنید"
        onPress={() => {
          setHasEnaughCredit(true);
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;
