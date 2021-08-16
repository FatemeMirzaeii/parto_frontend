import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';

// components and utils
import LocalScreen from './LocalScreen';
import Loader from '../../components/Loader';
import api from '../../services/api';
import AxAPI from '../../services/AxAPI';
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
  // local states
  const [goftinoReady, setGoftinoReady] = useState(false);
  const [goftinoOpen, setGoftinoOpen] = useState(false);
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [hasOpenChat, setHasOpenChat] = useState();
  const [servicePrice, setServicePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(true);
  const [goftinoId, setGoftinoId] = useState();
  const [showPaymentBox, setShowPaymentBox] = useState();

  const { isVisible: insufficientCredit, toggle: toggleInsufficientCredit } =
    useModal();
  const { isVisible: walletPaymentIsVisible, toggle: toggleWalletPayment } =
    useModal();
  const { isVisible: successIsVisible, toggle: toggleSuccess } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !goftinoOpen,
      title: '',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={globalStyles.creditBox}>
          <CreditBox hasTitle />
        </TouchableOpacity>
      ),
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation, goftinoOpen]);

  useEffect(() => {
    checkCredit();
  }, []);

  const unsetUserId = `
  Goftino.unsetUserId();
  window.ReactNativeWebView.postMessage('unsetUserId');
`;
  const localStorage = `
  window.localStorage.setItem('goftino_BdaydR', '${route.params.goftinoId}');
`;
  const onScreenLoad = async () => {
    switch (route.params.enName) {
      case 'midwifery':
        await determineGoftinoId(route.params.goftinoId, midwiferyAssistantId);
        break;
      case 'nutrition':
        await determineGoftinoId(route.params.goftinoId, nutritionAssistantId);
        break;
      case 'treatise':
        await determineGoftinoId(route.params.goftinoId, treatiseAssistantId);
        break;
      default:
        break;
    }
  };
  const determineGoftinoId = async (assistantReduxId, dispatchFunc) => {
    if (assistantReduxId) {
      ref.current.injectJavaScript(`Goftino.setUserId('${assistantReduxId}');`);
    } else {
      ref.current.injectJavaScript(unsetUserId);
      const id = await getGoftinoId(route.params.id);
      if (id) {
        setGoftinoId(id);
        ref.current.injectJavaScript(`Goftino.setUserId('${id}');`);
      } else {
        if (goftinoId) {
          await sendGoftinoId(route.params.id, goftinoId);
          // return false;
        }
      }
      dispatch(dispatchFunc(goftinoId));
    }
    return true;
  };
  const onMessage = (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        ref.current.injectJavaScript(`Goftino.setUser({
          name : '${userPhoneNo}-${route.params.id}',
          phone : '${userPhoneNo}',
          forceUpdate : true,
        });`);
        if (hasOpenChat)
          ref.current.injectJavaScript(`Goftino.open();
          Goftino.setUser({
          forceUpdate : true,
          tags: 'open'
        });`);
        setGoftinoReady(true);
        break;
      case 'goftino_open':
        setGoftinoOpen(true);
        setShowPaymentBox(!hasOpenChat);
        break;
      case 'goftino_close':
        setGoftinoOpen(false);
        setShowPaymentBox(false);
        break;
      case 'unsetUserId':
        console.log('unsetted');
        break;
      case 'setUserId':
        console.log('new user Id setted');
        break;
      case 'closed':
        setHasOpenChat(false);
        setShowPaymentBox(true);
        break;
      case 'open':
        setHasOpenChat(true);
        setShowPaymentBox(false);
        break;
      case 'send_message':
        break;
      // case value:
      //   break;
      default:
        if (event.nativeEvent.data) {
          const data = event.nativeEvent.data;
          setGoftinoId(data);
          console.log(`set goftinoId ${goftinoId}`);
          onScreenLoad();
        }
        break;
    }
  };
  const getGoftinoId = async (categoryId) => {
    try {
      const ax = await AxAPI(true);
      const res = await ax.get(
        `/message/messageInfo/${userId}/${categoryId}/goftinoId/fa`,
      );
      if (!res) return false;
      return res.data.data.goftinoId;
    } catch (err) {
      switch (err.response.status) {
        case 404:
          return false;
        default:
          break;
      }
    }
  };
  const sendGoftinoId = async (categoryId, gId) => {
    const res = await api({
      method: 'POST',
      url: `/message/v1/goftinoId/${userId}/fa`,
      dev: true,
      data: { categoryId, goftinoId: gId },
    });
    if (!res) return false;
    return true;
  };
  const getServicePrice = async (serviceId) => {
    const res = await api({
      method: 'GET',
      url: `/payment/services/${serviceId}/price/fa`,
      dev: true,
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
  const walletPayment = async () => {
    setIsLoading(true);
    const success = await purchase();
    if (success) {
      // await checkCredit();
      setIsLoading(false);
      toggleSuccess();
      toggleWalletPayment();
    } else {
      toggleWalletPayment();
    }
  };
  const purchase = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      dev: true,
      data: {
        serviceId: 1, //todo: static serviceId?
        method: 'wallet',
        discount: '0',
      },
    });
    if (!success) return false;
    return true;
  };
  const onSuccess = () => {
    setHasOpenChat(true);
    setShowPaymentBox(false);
    ref.current.reload(); // todo: not so good.
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
          onPress={() => ref.current.injectJavaScript('Goftino.toggle();')}
        />
      )}
      <WebView
        ref={ref}
        containerStyle={{ flex: 12 }}
        source={{ uri: route.params.uri }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
        injectedJavaScript={goftino}
        injectedJavaScriptBeforeContentLoaded={localStorage}
        scalesPageToFit
        startInLoadingState
        renderLoading={() => {
          return <Loader />;
        }}
        onHttpError={(syntheticEvent) => {
          setHttpError(true);
          const { nativeEvent } = syntheticEvent;
          console.log('WebView received http error status code: ', nativeEvent);
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
      {showPaymentBox && goftinoOpen ? (
        <Button
          containerStyle={styles.newQuestionCont}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          loading={hasOpenChat === undefined ? true : false}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید."
          onPress={() => {
            if (hasEnaughCredit) toggleWalletPayment();
            else toggleInsufficientCredit();
          }}
        />
      ) : null}
      <DialogBox
        isVisible={insufficientCredit}
        hide={toggleInsufficientCredit}
        // icon={<Image source={Pay} resizeMode="center" />}
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
