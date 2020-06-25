import {View} from 'native-base';
import React, {useEffect} from 'react';
import {Image, Text} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Theme} from '../../app/Theme';
import {getData} from '../../app/Functions';
import AsyncStorage from '@react-native-community/async-storage';

const {colors, size, fonts} = Theme;
const Splash = (props) => {
  useEffect(() => {
    setTimeout(async () => {
      AsyncStorage.clear();
      const start = await getData('@startPages');
      const token = await getData('@token');
      if (start == 'true' && token) {
        props.navigation.navigate('Home');
      } else if (token) {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'StartQuestion'})],
          }),
        );
      } else {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})],
          }),
        );
      }
    }, 800);
  });
  return (
    <View style={{backgroundColor: 'pink', flex: 1, justifyContent: 'center'}}>
      <Image
        style={{
          alignSelf: 'center',
          borderRadius: 200,
          width: 200,
          height: 200,
          marginBottom: 50,
        }}
        source={require('../../../assets/images/parto.jpeg')}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontFamily: fonts.regular,
          fontSize: size[24],
        }}>
        {' '}
        پرتو دستیار هوشمند سلامت بانوان{' '}
      </Text>
    </View>
  );
};
export default Splash;
