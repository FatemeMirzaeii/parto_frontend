import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

//components
import CreditBox from './CreditBox';
import Card from './Card';

// styles
import { COLOR, FONT } from '../styles/static';
import globalStyles from '../styles';

const UserWallet = ({ navigation }) => {
  return (
    <Card>
      <View style={styles.titleContainer}>
        <Icon size={30} name="goal" type="parto" color={COLOR.icon} />
        {/*todo*/}
        <Text style={styles.title}>کیف پول</Text>
      </View>
      <View style={styles.container}>
        <CreditBox hasTitle />
        <Button
          title="افزایش اعتبار"
          type="solid"
          onPress={() => navigation.navigate('Wallet')}
          containerStyle={globalStyles.btnContainer}
          buttonStyle={globalStyles.prevButton}
          titleStyle={globalStyles.btnDarkTitle}
        />
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingRight: 10,
    fontFamily: FONT.medium,
    fontSize: 12,
    color: '#666666',
  },
  titleContainer: {
    paddingLeft: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    margin: 10,
  },
});
export default UserWallet;
