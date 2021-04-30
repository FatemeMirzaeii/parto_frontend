import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, Text, SafeAreaView, ToastAndroid, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { GiftedChat } from 'react-native-gifted-chat';

//redux
import { useDispatch, useSelector } from 'react-redux';

//components
import Loader from '../../components/Loader';
import Card from '../../components/Card';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import commonStyles from '../../styles/index';

const Assistant = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'دستیار',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          // color={COLOR.purple}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
    });
  }, [navigation]);
  const runF = `
  <!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Example for Goftino Events</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
    <style>
        body{font-family: Arial Tahoma;margin: 20px;font-size: 18px;}
        span{font-weight: bold}
    </style>
</head>
<body>

    <!--- Show Event Data --->
    <div>Event Sender: <span id="sender">...</span></div>
    <div>Event Type: <span id="type">...</span></div>
    <div>Message Content: <span id="content">...</span></div>
    <br>
    <div>Widget Status: <span id="widget">...</span></div>

    <!---start GOFTINO code--->
    <script type="text/javascript">
      !function(){var a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/BdaydR",l=localStorage.getItem("goftino");g.type="text/javascript",g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
    </script>
    <!---end GOFTINO code--->


    <!--- Add these lines for listening to events --->
    <script>
    window.addEventListener("goftino_ready", function () {
      window.ReactNativeWebView.postMessage("Goftino Widget is Loaded Successfully!")
  });
  setTimeout(function () {
    window.ReactNativeWebView.postMessage("Hello!")
  }, 2000)
    </script>

</body>
</html>
`;
  const runFirst = `
window.isNativeApp = true;
true; // note: this is required, or you'll sometimes get silent failures
`;
  const html = `
<html>
<head>lslsk</head>
<body>
  <script>
    setTimeout(function () {
      window.ReactNativeWebView.postMessage("Hello!")
    }, 2000)
  </script>
</body>
</html>
`;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <WebView
        source={{ html: runF }}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        domStorageEnabled={true}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
      /> */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default Assistant;
