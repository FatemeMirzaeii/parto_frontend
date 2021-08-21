import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, Text, View, ScrollView, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';

//redux
import { useDispatch, useSelector } from 'react-redux';

//components
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import DialogBox from '../../components/DialogBox';
import Loader from '../../components/Loader';
import useModal from '../../util/hooks/useModal';
import api from '../../services/api';
import CreditBox from '../../components/CreditBox';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';
import WalletImg from '../../../assets/images/wallet/wallet.png';
import PartnerWallet from '../../../assets/images/wallet/partner_wallet.png';
import Coin from '../../../assets/images/wallet/coin.png';
import DiscountCoin from '../../../assets/images/wallet/discount_coin.png';
import Pay from '../../../assets/images/wallet/pay.png';

const Wallet = ({ navigation }) => {
  const userId = useSelector((state) => state.user.id);
  const template = useSelector((state) => state.user.template);

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bankUrl, setBankUrl] = useState();

  const { isVisible: paymentIsVisibile, toggle: togglePayment } = useModal();
  const { isVisible: paymentSuccess, toggle: togglePaymentSuccess } =
    useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کیف پول',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    getServices();
  }, [showGateway]);

  const getServices = async () => {
    const srv = await api({
      method: 'GET',
      url: '/payment/v1/services/fa',
      dev: true,
    });
    if (!srv) return false;
    if (srv.data.data.services) {
      setServices(srv.data.data.services);
    }
    return true;
  };
  const payment = async () => {
    setIsLoading(true);
    await sendToBank();
    setIsLoading(false);
    togglePayment();
  };
  const sendToBank = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      dev: true,
      data: {
        serviceId: selectedPackage.id,
        method: 'gateway',
        discount: selectedPackage.discountValue,
      },
    });
    if (!success) return false;
    setBankUrl(success.data.data.link);
    setShowGateway(true);
    return true;
  };
  const verifyPurchase = async (body) => {
    const res = await api({
      method: 'POST',
      url: `/payment/v1/verifyPurchase/${userId}/fa`,
      dev: true,
      data: body,
    });
    if (!res) return false;
    // show modals to user
    console.log('verifyPurchase', res.data);
    if (res.status === 200) togglePaymentSuccess();
    return true;
  };
  const onMessage = async (e) => {
    let data = e.nativeEvent.data;
    let paymentResult = JSON.parse(data);
    const payment_res = {
      status: paymentResult.status,
      authority: paymentResult.id,
      orderId: paymentResult.order_id,
    };
    await verifyPurchase(payment_res);
    setShowGateway(false);
  };
  const onBackdropPress = () => {
    isLoading
      ? () => {
          return;
        }
      : togglePayment();
  };
  const calculateDiscountedPrice = (price, discountValue, discountType) => {
    if (discountType === 'Percent')
      return price - (price * discountValue) / 100;
    if (discountType === 'Rials') return price - discountValue;
  };
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.wallet}>
        <Image
          style={styles.img}
          source={template === 'Partner' ? PartnerWallet : WalletImg}
          resizeMode="contain"
        />
        <CreditBox hasTitle />
      </Card>
      <Text
        style={[
          globalStyles.regularTxt,
          { textAlign: 'right', paddingHorizontal: 50 },
        ]}>
        افزایش اعتبار:
      </Text>
      <View style={styles.credits}>
        {services.map((service, i) => {
          return (
            <Card
              key={service.price}
              hasHeader
              headerTitle={service.name}
              headerColor={COLOR.btn}
              headerTxtStyle={styles.headerTxt}
              onPress={() => {
                setSelectedPackage(service);
                togglePayment();
              }}>
              <View style={styles.packages}>
                {service.discountValue ? (
                  <Text
                    style={[
                      globalStyles.regularTxt,
                      {
                        textDecorationLine: 'line-through',
                      },
                    ]}>
                    {service.price} ریال
                  </Text>
                ) : (
                  <Text>{'\b'}</Text>
                )}
                <View style={styles.package}>
                  <Text style={globalStyles.regularTxt}>
                    {'   '}
                    {service.discountValue
                      ? calculateDiscountedPrice(
                          service.price,
                          service.discountValue,
                          service.discountType,
                        )
                      : service.price}
                    {'   '}
                    ریال
                  </Text>
                  <Image
                    style={globalStyles.coin}
                    resizeMode="center"
                    source={service.discountValue ? DiscountCoin : Coin}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
      <DialogBox
        isVisible={paymentIsVisibile}
        isLoading={isLoading}
        hide={togglePayment}
        onBackdropPress={onBackdropPress} // todo: does we really need this?
        icon={<Icon type="parto" name="wallet" color="#aaa" size={50} />}
        text="شارژ کیف پول"
        firstBtnTitle="پرداخت"
        firstBtnColor={COLOR.btn}
        firstBtnPress={payment}>
        <Text style={globalStyles.regularTxt}>مبلغ انتخاب شده:</Text>
        <CreditBox
          value={
            selectedPackage.discountValue
              ? calculateDiscountedPrice(
                  selectedPackage.price,
                  selectedPackage.discountValue,
                  selectedPackage.discountType,
                )
              : selectedPackage.price
          }
        />
      </DialogBox>
      <DialogBox
        isVisible={paymentSuccess}
        hide={togglePaymentSuccess}
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
          togglePaymentSuccess();
        }}
        firstBtnColor="green">
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <CreditBox />
      </DialogBox>
      {showGateway && (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'slide'}>
          <WebView
            source={{ uri: bankUrl }}
            style={{ flex: 1 }}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loader}>
                <Loader />
              </View>
            )}
            onMessage={onMessage}
            onHttpError={(syntheticEvent) => {
              // setHttpError(true);
              const { nativeEvent } = syntheticEvent;
              console.log(
                'WebView received http error status code: ',
                nativeEvent,
              );
            }}
            onError={(e) => console.log(e)}
            renderError={(d, c, des) => {
              alert(c);
              return (
                <View style={styles.error}>
                  <Text>No Internet Connection</Text>
                </View>
              );
            }}
          />
        </Modal>
      )}
    </ScrollView>
  );
};

export default Wallet;
