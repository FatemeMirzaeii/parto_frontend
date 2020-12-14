import React, { useCallback } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//store
import {
  handleMainSelected,
  handleTeenagerSelected,
  handlePartnerSelected,
} from '../../store/actions/template';

//styles
import styles from './styles';

const Template = (props) => {
  const modeState = useSelector((state) => state.template.mode);
  const dispatch = useDispatch();

  const _handleMainSelected = useCallback(() => {
    dispatch(handleMainSelected());
    props.navigation.navigate('Interview');
  }, [dispatch, props.navigation]);

  const _handleTeenagerSelected = useCallback(() => {
    dispatch(handleTeenagerSelected());
    props.navigation.navigate('Q2', {
      mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
    });
  }, [dispatch]);

  const _handlePartnerSelected = useCallback(() => {
    dispatch(handlePartnerSelected());
    props.navigation.navigate('PartnerCode');
  }, [dispatch, props.navigation]);

  console.log('mod of app$$$$$$$$$$$$', modeState);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/0.png')}
        style={styles.bg}>
        <View style={styles.cont}>
          <Text style={styles.question}>پوسته‌ی مورد نظرت رو انتخاب کن:</Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.mode} onPress={_handleMainSelected}>
              <Text style={styles.btnTitle}>بانو</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={_handleTeenagerSelected}>
              <Text style={styles.btnTitle}>نوجوان</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={_handlePartnerSelected}>
              <Text style={styles.btnTitle}>همسر</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Template;
