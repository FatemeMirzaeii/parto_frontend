import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

//styles
import styles from './styles';

const Chat = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: route.params.uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;
