import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//components
import api from '../services/api';
import Loader from './Loader';
import { setCredit } from '../store/actions/user';

//styles
import globalStyles from '../styles';
import Coin from '../../assets/images/wallet/coin.png';

const CreditBox = (props) => {
  const [val, setVal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

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
      setVal(cre.data.data.remaining);
      dispatch(setCredit(cre.data.data.remaining));
      setIsLoading(false);
    }
    return true;
  };
  return (
    <View style={globalStyles.creditBox}>
      <Text style={globalStyles.regularTxt}>{'   '}ریال</Text>
      <Text style={globalStyles.regularTxt}>
        {isLoading ? <Loader size="small" /> : props.value ?? val}
      </Text>
      {props.hasTitle ? (
        <Text style={globalStyles.regularTxt}>اعتبار:{'     '}</Text>
      ) : null}
      <Image style={globalStyles.coin} resizeMode="center" source={Coin} />
    </View>
  );
};

export default CreditBox;
