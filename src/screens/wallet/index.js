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

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';
import WalletImg from '../../../assets/images/wallet/wallet.png';
import Coin from '../../../assets/images/wallet/coin.png';
import Pay from '../../../assets/images/wallet/pay.png';

const Wallet = ({ navigation }) => {
  const categories = [
    { amount: 5000 },
    { amount: 10000 },
    { amount: 15000 },
    { amount: 20000 },
  ];
  const [credit, setCredit] = useState('');
  const { isVisible, toggle } = useModal();
  const { isVisible: paySuccess, toggle: togglePaySuccess } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bankUrl, setBankUrl] = useState();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    getUserCredit();
  }, [showGateway]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کیف پول',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  const getUserCredit = async () => {
    const cre = await api({
      method: 'GET',
      url: `/payment/v1/credit/${userId}/fa`,
      dev: true,
    });
    if (!cre) return false;
    console.log('remaining', cre.data.data.remaining);
    if (cre.data.data.remaining) {
      setCredit(cre.data.data.remaining);
    }
    return true;
  };

  const sendToBank = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      dev: true,
      data: {
        serviceId: 2, //todo
        method: 'gateway',
        discount: '0',
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
    if (res.status === 200) togglePaySuccess();
    return true;
  };
  const onMessage = async (e) => {
    let data = e.nativeEvent.data;
    let paymentResult = JSON.parse(data);
    const res = {
      status: paymentResult.status,
      authority: paymentResult.id,
      orderId: paymentResult.order_id,
    };
    await verifyPurchase(res);
    setShowGateway(false);
  };
  const onBackdropPress = () => {
    isLoading
      ? () => {
          return;
        }
      : toggle();
  };
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Image style={styles.img} source={WalletImg} resizeMode="contain" />
        <Text
          style={[
            globalStyles.regularTxt,
            { textAlign: 'right', padding: 10 },
          ]}>
          اعتبار شما:
        </Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </Card>
      <Text
        style={[
          globalStyles.regularTxt,
          { textAlign: 'right', paddingHorizontal: 50 },
        ]}>
        افزایش اعتبار:
      </Text>
      <View style={styles.credits}>
        {categories.map((category, i) => {
          return (
            <Card
              key={category.amount}
              hasHeader
              headerTitle={`اعتبار: ${credit} ریال`}
              // headerTitle={'بسته شماره ۱'}
              headerColor={COLOR.btn}
              headerTxtStyle={{ color: 'white', fontSize: 13 }}
              onPress={() => {
                setSelectedPackage(category.amount);
                toggle();
              }}>
              <View style={styles.packages}>
                <Text style={globalStyles.regularTxt}> ریال</Text>
                <Text style={globalStyles.regularTxt}>{category.amount}</Text>
                <Image style={styles.coin} resizeMode="center" source={Coin} />
              </View>
            </Card>
          );
        })}
      </View>
      <DialogBox
        isVisible={isVisible}
        isLoading={isLoading}
        hide={toggle}
        onBackdropPress={onBackdropPress}
        icon={<Icon type="parto" name="exit" color="#aaa" size={50} />}
        text="شارژ کیف پول"
        firstBtnTitle="پرداخت"
        firstBtnPress={async () => {
          setIsLoading(true);
          await sendToBank();
          setIsLoading(false);
          toggle();
        }}>
        <Text style={globalStyles.regularTxt}>مبلغ انتخاب شده:</Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{selectedPackage}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
      </DialogBox>
      <DialogBox
        isVisible={paySuccess}
        hide={togglePaySuccess}
        icon={<Image source={Pay} resizeMode="center" />}
        text="پرداخت با موفقیت انجام شد."
        firstBtnTitle="باشه"
        firstBtnPress={() => {
          togglePaySuccess();
        }}
        firstBtnColor="green">
        <Text style={globalStyles.regularTxt}>باقی‌مانده اعتبار:</Text>
        <View style={styles.creditBox}>
          <Text style={globalStyles.regularTxt}>ریال</Text>
          <Text style={globalStyles.regularTxt}>{credit}</Text>
          <Image style={styles.coin} resizeMode="center" source={Coin} />
        </View>
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
                <Loader type="ActivityIndicator" />
              </View>
            )}
            onMessage={onMessage}
          />
        </Modal>
      )}
    </ScrollView>
  );
};

export default Wallet;
