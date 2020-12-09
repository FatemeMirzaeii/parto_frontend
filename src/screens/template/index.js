import React, {useCallback} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  handleMainSelected,
  handleTeenagerSelected,
  handlePartnerSelected,
} from '../../store/actions/template';

import styles from './styles';

const Template = (props) => {
  //const modeState = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  const _handleMainSelected = useCallback(() => {
    dispatch(handleMainSelected());
  }, [dispatch]);

  const _handleTeenagerSelected = useCallback(() => {
    dispatch(handleTeenagerSelected());
  }, [dispatch]);

  const _handlePartnerSelected = useCallback(() => {
    dispatch(handlePartnerSelected());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/0.png')}
        style={styles.bg}>
        <View style={styles.cont}>
          <Text style={styles.question}>پوسته‌ی مورد نظرت رو انتخاب کن:</Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={styles.mode}
              onPress={{ _handleMainSelected }}>
              <Text style={styles.btnTitle}>بانو</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={{ _handleTeenagerSelected }}>
              <Text style={styles.btnTitle}>نوجوان</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={{ _handlePartnerSelected }}>
              <Text style={styles.btnTitle}>همسر</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Template;
