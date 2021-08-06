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

//styles
import globalStyles from '../../styles';
import styles from './styles';
import Pay from '../../../assets/images/wallet/pay.png';
import {
  midwiferyAssistantId,
  nutritionAssistantId,
  treatiseAssistantId,
} from '../../store/actions/goftino';

const Chat = ({ navigation, route }) => {
  const [goftinoReady, setGoftinoReady] = useState(false);
  const [goftinoOpen, setGoftinoOpen] = useState(false);
  const [hasEnaughCredit, setHasEnaughCredit] = useState(false);
  const [hasOpenChat, setHasOpenChat] = useState(false);
  const [servicePrice, setServicePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(true);
  const [goftinoId, setGoftinoId] = useState();
  const [showCreditBox, setShowCreditBox] = useState();
  const userId = useSelector((state) => state.user.id);
  const credit = useSelector((state) => state.user.credit);
  const userPhoneNo = useSelector((state) => state.user.phone);
  const goftinoIds = useSelector((state) => state.goftino);
  const { isVisible, toggle } = useModal();
  const { isVisible: approveIsVisible, toggle: toggleApprove } = useModal();
  const { isVisible: successIsVisible, toggle: toggleSuccess } = useModal();
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const res = checkCredit();
    // if(!res) khob chi?
    onScreenLoad();
  }, []);
  const getUserIdScript = `
  var userId = Goftino.getUserId();
  window.ReactNativeWebView.postMessage(userId);
  `;
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

  const onScreenLoad = async () => {
    switch (route.params.enName) {
      case 'nutrition':
        await determineGoftinoId(
          goftinoIds.nutritionAssistantId,
          route.params.id,
        );
        dispatch(nutritionAssistantId(goftinoId));
        break;
      case 'midwifery':
        await determineGoftinoId(
          goftinoIds.midwiferyAssistantId,
          route.params.id,
        );
        dispatch(midwiferyAssistantId(goftinoId));
        break;
      case 'treatise':
        await determineGoftinoId(
          goftinoIds.treatiseAssistantId,
          route.params.id,
        );
        dispatch(treatiseAssistantId(goftinoId));
        break;
      default:
        break;
    }
  };
  const determineGoftinoId = async (currentReduxId, categoryId) => {
    alert(currentReduxId);
    if (!currentReduxId) {
      const id = await getGoftinoId(categoryId);
      console.log('goftinoId', id);
      if (!id) {
        ref.current.injectJavaScript(getUserIdScript);
        await sendGoftinoId(categoryId, goftinoId);
      } else {
        ref.current.injectJavaScript(`Goftino.setUserId(${id});`);
        await setGoftinoId(id);
      }
    }
  };
  const onMessage = (event) => {
    switch (event.nativeEvent.data) {
      case 'goftino_ready':
        ref.current.injectJavaScript(`Goftino.setUser({
          name : '${userPhoneNo}',
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
        setShowCreditBox(!hasOpenChat);
        break;
      case 'goftino_close':
        setGoftinoOpen(false);
        setShowCreditBox(false);
        break;
      case 'closed':
        setHasOpenChat(false);
        setShowCreditBox(true);
        break;
      case 'open':
        setHasOpenChat(true);
        break;
      case 'send_message':
        break;
      // case value:
      //   break;
      default:
        alert(event.nativeEvent.data);
        const data = JSON.parse(event.nativeEvent.data);
        setGoftinoId(data);
        alert(data.toString());
        break;
    }
  };
  const getGoftinoId = async (categoryId) => {
    try {
      const ax = await AxAPI(true);
      const res = await ax.get(
        `/message/messageInfo/${userId}/${categoryId}/goftinoId/fa`, //todo
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
    const ax = await AxAPI(true);
    const res = await ax.post(
      `/message/v1/goftinoId/${userId}/fa`, //todo
      { categoryId, goftinoId: gId },
    );
    if (!res) return false;
    return true;
  };
  const getServicePrice = async () => {
    const res = await api({
      method: 'GET',
      url: '/payment/services/1/price/fa', //todo: should set serviceId dynamically
      dev: true,
    });
    if (!res) return false;
    setServicePrice(res.data.data.price);
    return res.data.data.price;
  };

  const checkCredit = async () => {
    //calling api to get credit and service price.
    const price = await getServicePrice();
    if (credit >= price) {
      setHasEnaughCredit(true);
    }
    setIsLoading(false);
    return true;
  };

  const creditDeduction = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      dev: true,
      data: {
        serviceId: 1,
        method: 'wallet',
        discount: '0',
      },
    });
    if (!success) return false;
    return true;
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
              <Text>no internet connection</Text>
            </View>
          );
        }}
      />
      {showCreditBox && goftinoOpen ? (
        <Button
          containerStyle={styles.newQuestionCont}
          buttonStyle={styles.newQuestion}
          titleStyle={styles.text}
          title="برای پرسیدن سوال جدید اینجا کلیک کنید."
          onPress={() => {
            if (hasEnaughCredit) toggleApprove();
            else toggle();
          }}
        />
      ) : null}
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        // icon={<Image source={Pay} resizeMode="center" />}
        text="اعتبار شما کافی نیست."
        firstBtnTitle="افزایش موجودی"
        firstBtnPress={() => {
          navigation.navigate('Wallet');
          toggle();
        }}
        firstBtnColor="orange">
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <CreditBox />
      </DialogBox>
      <DialogBox
        isVisible={approveIsVisible}
        hide={toggleApprove}
        isLoading={isLoading}
        icon={<Icon type="parto" name="wallet" color="#aaa" size={50} />}
        text="مبلغ قابل پرداخت:"
        firstBtnTitle="پرداخت از کیف پول"
        firstBtnPress={async () => {
          setIsLoading(true);
          const success = await creditDeduction();
          if (success) {
            await checkCredit();
            setIsLoading(false);
            toggleSuccess();
            toggleApprove();
          } else {
            toggleApprove();
          }
        }}>
        {/* <Text style={globalStyles.regularTxt}>مبلغ قابل پرداخت:</Text> */}
        <CreditBox value={servicePrice} />
      </DialogBox>
      <DialogBox
        isVisible={successIsVisible}
        hide={toggleSuccess}
        icon={
          <Image
            source={Pay}
            resizeMode="center"
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
        }
        text="پرداخت با موفقیت انجام شد."
        firstBtnTitle="باشه"
        firstBtnPress={() => {
          ref.current.reload(); // todo: not so good.
          setHasOpenChat(true);
          setShowCreditBox(false);
          toggleSuccess();
        }}>
        <Text style={globalStyles.regularRightTxt}>اعتبار شما:</Text>
        <CreditBox />
      </DialogBox>
    </View>
  );
};

export default Chat;
