import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  View,
  BackHandler,
  Button,
} from 'react-native';
import styles from './styles';
import { Icon, ListItem } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
const Passcode = ({ navigation }) => {
  const [input, setInput] = useState('');
  const passcode = useSelector((state) => state.user.passcode);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        _handleBackButtonClick,
      );
    };
  }, [_handleBackButtonClick]);

  useEffect(() => {
    if (input === '1234') {
      navigation.pop();
    } else if (input.length === 4) {
      ToastAndroid.show(
        'کد ورود اشتباه است؛ لطفا دوباره تلاش کنید.',
        ToastAndroid.LONG,
      );
    }
  }, [input, navigation]);

  const _handleBackButtonClick = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  console.log('passcode', passcode);

  return (
    <SafeAreaView>
      <View style={styles.field}>
        <Text style={styles.label}>Pass</Text>
        <TextInput
          style={styles.input}
          password={true}
          autoCapitalize="none"
          onChangeText={(txt) => setInput(txt)}
          //onChangeText={_handleBtnPress}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button title="انصراف" onPress={() => BackHandler.exitApp()}></Button>
    </SafeAreaView>
  );
};
export default Passcode;
