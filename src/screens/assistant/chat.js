import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Button, Icon } from 'react-native-elements';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';

// components and utils
import LocalScreen from './LocalScreen';
import Loader from '../../components/Loader';
import api from '../../services/api';
import { goftino } from './goftino';
import BackButton from '../../components/BackButton';
import DialogBox from '../../components/DialogBox';
import useModal from '../../util/hooks/useModal';
import CreditBox from '../../components/CreditBox';
import {
  midwiferyAssistantId,
  nutritionAssistantId,
  treatiseAssistantId,
} from '../../store/actions/goftino';

//styles
import globalStyles from '../../styles';
import styles from './styles';
import Pay from '../../../assets/images/wallet/pay.png';

const Chat = ({ navigation, route }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  // redux states
  const userId = useSelector((state) => state.user.id);
  const credit = useSelector((state) => state.user.credit);
  const userPhoneNo = useSelector((state) => state.user.phone);
  const goftinoIds = useSelector((state) => state.goftino);

  // local states
  const [key, setKey] = useState(0);
  const [goftinoReady, setGoftinoReady] = useState(false);
  const [goftinoOpen, setGoftinoOpen] = useState(false);
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [hasOpenChat, setHasOpenChat] = useState();
  const [servicePrice, setServicePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(true);
  const [goftinoId, setGoftinoId] = useState();
  // const [openChat, setOpenChat] = useState();
  const [status, setStatus] = useState();
  const [hasNewPayment, setHasNewPayment] = useState();

  const { isVisible: insufficientCredit, toggle: toggleInsufficientCredit } =
    useModal();
  const { isVisible: walletPaymentIsVisible, toggle: toggleWalletPayment } =
    useModal();
  const { isVisible: successIsVisible, toggle: toggleSuccess } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !goftinoOpen,
      title: route.params.title,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={globalStyles.creditBox}>
          <CreditBox hasTitle />
        </TouchableOpacity>
      ),
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation, goftinoOpen, route.params.title]);

  useEffect(() => {
    checkCredit();
  }, [credit]);

  useEffect(() => {
    if (route.params.goftinoId) getMessageStatus();
  }, []); //maybe need to add goftinoId as dependency.

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      StatusBar.setTranslucent(true);
    });
    return unsubscribe;
  }, [navigation]);

  const unsetUserId = `
  Goftino.unsetUserId();
  window.ReactNativeWebView.postMessage('unsetUserId');
`;

  // if route.params.goftinoId were null, this will add null value to goftino_ and will act as Goftino.unsetUserId.
  const localStorageGoftinoId = `
  window.localStorage.setItem('goftino_BdaydR', '${route.params.goftinoId}');
`;

  const onScreenLoad = async () => {
    switch (route.params.enName) {
      case 'midwifery':
        await determineGoftinoId(
          goftinoIds.midwiferyAssistantId,
          midwiferyAssistantId,
        );
        break;
      case 'nutrition':
        await determineGoftinoId(
          goftinoIds.nutritionAssistantId,
          nutritionAssistantId,
        );
        break;
      case 'treatise':
        await determineGoftinoId(
          goftinoIds.treatiseAssistantId,
          treatiseAssistantId,
        );
        break;
      default:
        break;
    }
  };
  const determineGoftinoId = async (assistantReduxId, dispatchFunc) => {
    if (assistantReduxId) {
      ref.current.injectJavaScript(`Goftino.setUserId('${assistantReduxId}');`);
    } else {
      // ref.current.injectJavaScript(unsetUserId);
      if (goftinoId) {
        const res = await sendGoftinoId(route.params.id, goftinoId);
        if (res) {
          dispatch(dispatchFunc(goftinoId));
          const r = await setMessageStatus(false);
          console.log('setMessageStatus after sending goftino Id false');
          if (r) {
            setStatus(false);
            setHasOpenChat(false);
            console.log('inja 3');
          }
        }
      }
    }
    return true;
  };
  const onMessage = async (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        ref.current.injectJavaScript(`Goftino.setUser({
          name : '${userPhoneNo}-${route.params.id}',
          phone : '${userPhoneNo}',
          forceUpdate : true,
        });`);
        if (hasOpenChat) {
          ref.current.injectJavaScript(`
          Goftino.setUser({
            tags: 'open',
            forceUpdate: true,
          });`);
        }
        setGoftinoReady(true);
        break;
      case 'goftino_open':
        StatusBar.setTranslucent(false);
        setGoftinoOpen(true);
        console.log('inja 1');
        break;
      case 'goftino_close':
        setGoftinoOpen(false);
        break;
      case 'closed':
        console.log('closed');
        if (hasNewPayment) return;
        const res = await setMessageStatus(false);
        console.log('setMessageStatus after closed tag false');
        if (res) {
          setStatus(false);
        }
        setHasOpenChat(false);
        console.log('inja 4');
        break;
      // case 'noTag':
      //   setHasOpenChat(false);
      //   console.log('inja 2');
      //   console.log('noTag');
      //   break;
      // case 'open':
      //   setHasOpenChat(true);
      //   console.log('open');
      //   break;
      case 'send_message':
        setHasNewPayment(false);
        break;
      // case value:
      //   break;
      default:
        if (event.nativeEvent.data) {
          try {
            const r = JSON.parse(event.nativeEvent.data);
            if (r.type === 'userId') {
              setGoftinoId(r.data);
              console.log(`set goftinoId ${goftinoId}`);
              // determineGoftinoId(route.params.goftinoId); //todo: its good if I can pass dispatchFunc with params
              onScreenLoad();
            }
          } catch {
            return false;
          }
        }
        break;
    }
  };

  const sendGoftinoId = async (categoryId, gId) => {
    const res = await api({
      method: 'POST',
      url: `/message/v1/goftinoId/${userId}/fa`,
      // dev: true,
      data: { categoryId, goftinoId: gId },
    });
    if (!res) return false;
    return true;
  };
  const getServicePrice = async (serviceId) => {
    const res = await api({
      method: 'GET',
      url: `/payment/services/${serviceId}/price/fa`,
      // dev: true,
    });
    if (!res) return false;
    setServicePrice(res.data.data.price);
    return res.data.data.price;
  };
  const checkCredit = async () => {
    //calling api to get credit and service price.
    const price = await getServicePrice(1); //todo: should set serviceId dynamically
    if (credit >= price) {
      setHasEnaughCredit(true);
    }
    setIsLoading(false);
    return true;
  };
  const setMessageStatus = async (statuss) => {
    const res = await api({
      method: 'POST',
      url: `/message/status/${userId}/fa`,
      data: { categoryId: route.params.id, status: statuss },
    });
    if (!res) return false;
    return true;
  };
  const getMessageStatus = async () => {
    const res = await api({
      method: 'GET',
      url: `/message/status/${userId}/${route.params.id}/fa`,
    });
    if (!res) return false;
    console.log('sssstat', res.data.data.status);
    setStatus(res.data.data.status);
    return res.data.data.status;
  };
  const walletPayment = async () => {
    setIsLoading(true);
    const success = await purchase();
    if (success) {
      const r = await setMessageStatus(true);
      console.log('setMessageStatus after payment true');
      if (r) {
        setStatus(true);
        setHasOpenChat(true);
        setKey(key + 1);
        setHasNewPayment(true);
        setIsLoading(false);
        toggleWalletPayment();
        toggleSuccess();
      }
    } else {
      toggleWalletPayment();
    }
  };
  const purchase = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      // dev: true,
      data: {
        serviceId: 1, //todo: static serviceId and discount?
        method: 'wallet',
        discount: '0',
      },
    });
    if (!success) return false;
    return true;
  };
  const onSuccess = () => {
    toggleSuccess();
  };
  const goToWallet = () => {
    navigation.navigate('Wallet');
    toggleInsufficientCredit();
  };
  return (
    <View style={styles.container}>
      {httpError && (
        <LocalScreen
          goftinoOpen={goftinoOpen}
          goftinoReady={goftinoReady}
          onPress={() => {
            ref.current.injectJavaScript('Goftino.toggle();');
          }}
        />
      )}
      <KeyboardAvoidingView
        enabled={status}
        behavior={'padding'}
        contentContainerStyle={{ flex: 1 }}
        keyboardVerticalOffset={25}
        style={{ flexGrow: 12 }}>
        <WebView
          key={key}
          ref={ref}
          containerStyle={{ flex: 12 }}
          source={{ uri: route.params.uri }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={onMessage}
          injectedJavaScript={goftino}
          injectedJavaScriptBeforeContentLoaded={localStorageGoftinoId}
          scalesPageToFit
          startInLoadingState
          renderLoading={() => {
            return <Loader />;
          }}
          onHttpError={(syntheticEvent) => {
            setHttpError(true);
            const { nativeEvent } = syntheticEvent;
            console.log(
              'WebView received http error status code: ',
              nativeEvent,
            );
          }}
          onError={(e) => console.log(e)}
          renderError={(d, c, des) => {
            // alert(c);
            return (
              <View style={styles.error}>
                <Text>No Internet Connection</Text>
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>
      {!status && goftinoOpen && (
        <Button
          containerStyle={styles.newQuestionCont}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید."
          onPress={() => {
            ref.current.injectJavaScript('Goftino.toggle();');
            if (hasEnaughCredit) toggleWalletPayment();
            else toggleInsufficientCredit();
          }}
        />
      )}
      <DialogBox
        isVisible={insufficientCredit}
        hide={toggleInsufficientCredit}
        text="اعتبار شما کافی نیست."
        firstBtnTitle="افزایش موجودی"
        firstBtnPress={goToWallet}
        firstBtnColor="orange">
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <CreditBox />
      </DialogBox>
      <DialogBox
        isVisible={walletPaymentIsVisible}
        hide={toggleWalletPayment}
        isLoading={isLoading}
        icon={<Icon type="parto" name="wallet" color="#aaa" size={50} />}
        text="مبلغ قابل پرداخت:"
        firstBtnTitle="پرداخت از کیف پول"
        firstBtnPress={walletPayment}>
        <CreditBox value={servicePrice} />
      </DialogBox>
      <DialogBox
        isVisible={successIsVisible}
        hide={toggleSuccess}
        icon={
          <Image source={Pay} resizeMode="center" style={styles.dialogboxImg} />
        }
        text="پرداخت با موفقیت انجام شد."
        firstBtnTitle="باشه"
        firstBtnPress={onSuccess}>
        <Text style={globalStyles.regularRightTxt}>اعتبار شما:</Text>
        <CreditBox />
      </DialogBox>
    </View>
  );
};

export default Chat;
