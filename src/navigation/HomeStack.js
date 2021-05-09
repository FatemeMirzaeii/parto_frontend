import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';
import PregnancyProfile from '../screens/pregnancy-profile';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';
import Passcode from '../screens/passcode';
import { FONT } from '../styles/static';
import { useSelector } from 'react-redux';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  const lockType = useSelector((state) => state.user.lockType);
  return (
    <HomeStack.Navigator
      initialRouteName={lockType === 'Passcode' ? Passcode : Tabs}
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'flex-end',
          color: 'black',
          fontSize: 17,
          fontFamily: FONT.medium,
        },
      }}>
      <HomeStack.Screen
        name="Passcode"
        component={Passcode}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TrackingOptions"
        component={TrackingOptions}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="PregnancyProfile" component={PregnancyProfile} />
      <HomeStack.Screen
        name="PregnancyEnd"
        component={PregnancyEnd}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PregnancyEndCalendar"
        component={PregnancyEndCalendar}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
