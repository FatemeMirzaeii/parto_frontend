import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Icon } from 'native-base';
import Chart from './Chart/Chart';
import Record from './Record';
import { Theme, Width, Height } from '../../styles/Theme';
const { colors, size, fonts } = Theme;

const DataAnalysis = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [spinAnim, setspinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"></StatusBar>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          right: 10,
          top: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.openDrawer()}>
        <Icon name="bars" type="FontAwesome5"></Icon>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          width: 50,
          height: 80,
          left: 10,
          top: 45,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="message-circle"
            type="Feather"
            style={{ color: '#00BCD4' }}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="share"
            type="MaterialIcons"
            style={{ color: '#00BCD4' }}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 4,
          }}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexDirection: 'row',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: Width * 0.2,
                height: Width * 0.2,
                borderColor: '#437CD1',
                borderWidth: 2,
                marginHorizontal: 5,
                borderRadius: 1000,
                //borderStyle: 'dashed',
                //transform: [{ rotate: spin }],
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle3}>روز 30</Text>
            </View>
            <View
              style={{
                width: Width * 0.2,
                height: Width * 0.2,
                borderColor: '#437CD1',
                borderWidth: 2,
                marginHorizontal: 5,
                borderRadius: 1000,
                //borderStyle: 'dashed',
                //transform: [{ rotate: spin }],
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle3}>روز 7</Text>
            </View>
            <View
              style={{
                width: Width * 0.2,
                height: Width * 0.2,
                borderColor: '#437CD1',
                borderWidth: 2,
                marginHorizontal: 5,
                borderRadius: 1000,
                //borderStyle: 'dashed',
                //transform: [{ rotate: spin }],
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle3}>روز 2</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={styles.textView}>
              <Text style={styles.textStyle3}>کل دوره</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle3}>تعداد روزها</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle3}>تلورانس</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={{ flex: 2 }}>
        {isEnabled == true ? <Chart /> : <Record />}
      </View>
    </View>
  );
};

export default DataAnalysis;
const styles = StyleSheet.create({
  circle: {
    width: Width * 0.2,
    height: Width * 0.2,
    borderColor: '#437CD1',
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 1000,
    borderStyle: 'dashed',
    // transform: [{ rotate:  }],
  },
  textStyle1: {
    alignSelf: 'center',
    fontSize: size[17],
    fontFamily: fonts.medium,
    marginTop: 3,
    opacity: 0.7,
  },
  textStyle2: {
    alignSelf: 'center',
    fontSize: size[14],
    fontFamily: fonts.regular,
    marginTop: 10,
    opacity: 0.5,
  },
  textStyle3: {
    color: '#00BCD4',
    fontFamily: fonts.regular,
    fontSize: size[17],
  },
  textView: {
    marginHorizontal: 15,
  },
});
