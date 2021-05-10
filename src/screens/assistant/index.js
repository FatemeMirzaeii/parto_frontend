import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, Text, SafeAreaView, ToastAndroid, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';

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

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://www.goftino.com/c/BdaydR' }}
        // injectedJavaScriptBeforeContentLoaded={runFirst}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

export default Assistant;
