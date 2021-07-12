import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, Image } from 'react-native';
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

//styles
import globalStyles from '../../styles';
import styles from './styles';
import Coin from '../../../assets/images/wallet/coin.png';
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
  const [credit, setCredit] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(true);
  const [goftinoId, setGoftinoId] = useState();
  const [showCreditBox, setShowCreditBox] = useState();
  const userId = useSelector((state) => state.user.id);
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
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}> ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Text style={globalStyles.regularTxt}>اعتبار: </Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      ),
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation, goftinoOpen, credit]);

  const onScreenLoad = async () => {
    switch (route.params.id) {
      case 'nutrition':
        await determineGoftinoId(goftinoIds.nutritionAssistantId, 1); //todo
        dispatch(nutritionAssistantId(goftinoId));
        break;
      case 'midwifery':
        await determineGoftinoId(goftinoIds.midwiferyAssistantId, 2); //todo
        dispatch(midwiferyAssistantId(goftinoId));
        break;
      case 'treatise':
        await determineGoftinoId(goftinoIds.treatiseAssistantId, 3); //todo
        dispatch(treatiseAssistantId(goftinoId));
        break;
      default:
        break;
    }
  };
  const determineGoftinoId = async (currentReduxId, categoryId) => {
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
        setGoftinoReady(true);
        // ref.current.injectJavaScript(`Goftino.setUser({
        //   name : ${userPhoneNo},
        //   about : 'update sho',
        //   phone : ${userPhoneNo},
        //   forceUpdate : true
        // });`);
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
        break;
      case 'open':
        setHasOpenChat(true);
        break;
      // case value:
      //   break;
      default:
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
    const cre = await api({
      method: 'GET',
      url: `/payment/v1/credit/${userId}/fa`,
      dev: true,
    });
    if (!cre) return false;
    console.log('remaining', cre.data.data.remaining);
    setCredit(cre.data.data.remaining);
    if (cre.data.data.remaining >= price) {
      setHasEnaughCredit(true);
    }
    setIsLoading(false);
    return true;
  };

  const creditDeduction = async () => {
    //reduce credit
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
          return <Loader type="ActivityIndicator" />;
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
      {showCreditBox ? (
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
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </DialogBox>
      <DialogBox
        isVisible={approveIsVisible}
        hide={toggleApprove}
        isLoading={isLoading}
        // icon={<Image source={Pay} resizeMode="center" />}
        text=""
        firstBtnTitle="پرداخت از کیف پول"
        firstBtnPress={async () => {
          setIsLoading(true);
          const success = await creditDeduction();
          if (success) {
            await checkCredit();
            setIsLoading(false);
            toggleSuccess();
            toggleApprove();
          }
        }}>
        <Text style={globalStyles.regularTxt}>مبلغ قابل پرداخت:</Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{servicePrice}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </DialogBox>
      <DialogBox
        isVisible={successIsVisible}
        hide={toggleSuccess}
        // icon={<Image source={Pay} resizeMode="center" />}
        text="پرداخت با موفقیت انجام شد."
        firstBtnTitle="باشه"
        firstBtnPress={() => {
          toggleSuccess();
          setShowCreditBox(false);
        }}>
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </DialogBox>
    </View>
  );
};

export default Chat;
