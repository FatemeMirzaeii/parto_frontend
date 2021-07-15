import React from 'react';
import { View, Text, Image } from 'react-native';

//styles
import globalStyles from '../styles';
import Coin from '../../assets/images/wallet/coin.png';

const CreditBox = ({ value }) => {
  return (
    <View style={globalStyles.creditBox}>
      <Text style={globalStyles.regularTxt}>ریال</Text>
      <Text style={globalStyles.regularTxt}>{value}</Text>
      <Image style={globalStyles.coin} resizeMode="center" source={Coin} />
    </View>
  );
};

export default CreditBox;
