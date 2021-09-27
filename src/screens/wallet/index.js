import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, Text, View, ScrollView, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import analytics from '@react-native-firebase/analytics';

//redux
import { useSelector } from 'react-redux';

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

const Wallet = ({ navigation }) => {
  const userId = useSelector((state) => state.user.id);
  const template = useSelector((state) => state.user.template);

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [creditChanged, setCreditChanged] = useState(false);

  const { isVisible: paymentIsVisibile, toggle: togglePayment } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کیف پول',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', (url) => {
      if (url.url) setCreditChanged(true);
    });
  }, []);

  const getServices = async () => {
    const srv = await api({
      method: 'GET',
      url: '/payment/v1/services/fa',
      // dev: true,
    });
    if (!srv) return false;
    if (srv.data.data.services) {
      setServices(srv.data.data.services);
    }
    setIsLoading(false);
    return true;
  };
  const payment = async () => {
    setIsLoading(true);
    await analytics().logEvent('app_payment', {
      template: template,
      userId: userId,
      package: selectedPackage,
    });
    await sendToBank();
    setIsLoading(false);
    togglePayment();
  };
  const sendToBank = async () => {
    const success = await api({
      method: 'POST',
      url: `/payment/v1/purchase/${userId}/fa`,
      // dev: true,
      data: {
        serviceId: selectedPackage.id,
        method: 'gateway',
        discount: selectedPackage.discountValue,
        appOS: 'android',
      },
    });
    if (!success) return false;
    Linking.openURL(success.data.data.link);
    return true;
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
        <CreditBox hasTitle creditChanged={creditChanged} />
      </Card>
      <Text
        style={[
          globalStyles.regularTxt,
          { textAlign: 'right', paddingHorizontal: 50 },
        ]}>
        افزایش اعتبار:
      </Text>
      <View style={styles.credits}>
        {isLoading ? (
          <Loader />
        ) : (
          services.map((service, i) => {
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
          })
        )}
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
    </ScrollView>
  );
};

export default Wallet;
