import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

//components
import api from '../services/api';
import Loader from './Loader';

//styles
import globalStyles from '../styles';
import Coin from '../../assets/images/wallet/coin.png';

const CreditBox = (props) => {
  const [credit, setCredit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    props.value ? setIsLoading(false) : getUserCredit();
  }, []);

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
      setIsLoading(false);
    }
    return true;
  };
  return (
    <View style={globalStyles.creditBox}>
      <Text style={globalStyles.regularTxt}>{'   '}ریال</Text>
      <Text style={globalStyles.regularTxt}>
        {isLoading ? <Loader size="small" /> : props.value ?? credit}
      </Text>
      {props.hasTitle ? (
        <Text style={globalStyles.regularTxt}>اعتبار:{'     '}</Text>
      ) : null}
      <Image style={globalStyles.coin} resizeMode="center" source={Coin} />
    </View>
  );
};

export default CreditBox;
