import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

//components and utils
import CreditBox from './CreditBox';
import DialogBox from './DialogBox';
import Card from './Card';
import useModal from '../util/hooks/useModal';
import { removeData } from '../util/func';
import { signUp } from '../store/actions/auth';

// styles
import { COLOR, FONT } from '../styles/static';
import globalStyles from '../styles';

const UserWallet = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const { isVisible, toggle } = useModal();

  return (
    <Card>
      <View style={styles.titleContainer}>
        <Icon size={30} name="wallet" type="parto" color={COLOR.icon} />
        <Text style={styles.title}>کیف پول</Text>
      </View>
      <View style={styles.container}>
        <CreditBox hasTitle />
        <Button
          title="افزایش اعتبار"
          type="solid"
          onPress={() => {
            if (userId) navigation.navigate('Wallet');
            else toggle();
          }}
          containerStyle={globalStyles.btnContainer}
          buttonStyle={globalStyles.prevButton}
          titleStyle={globalStyles.btnDarkTitle}
        />
      </View>
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        text="پرتویی عزیز برای استفاده از کیف پول پرتو لازمه اول ثبت‌نام کنی."
        firstBtnTitle="ثبت‌نام"
        firstBtnPress={async () => {
          await removeData('@token');
          dispatch(signUp());
        }}
      />
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
