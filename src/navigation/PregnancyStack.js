import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PregnancyProfile from '../screens/pregnancy-profile';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';
import { FONT } from '../styles/static';

const PregnancyStack = createStackNavigator();
const PregnancyStackScreen = () => {
  return (
    <PregnancyStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'flex-end',
          color: 'black',
          fontSize: 17,
          fontFamily: FONT.medium,
        },
      }}>
      <PregnancyStack.Screen
        name="PregnancyProfile"
        component={PregnancyProfile}
      />
      <PregnancyStack.Screen
        name="PregnancyEnd"
        component={PregnancyEnd}
        options={{ headerShown: false }}
      />
      <PregnancyStack.Screen
        name="PregnancyEndCalendar"
        component={PregnancyEndCalendar}
        options={{ headerShown: false }}
      />
    </PregnancyStack.Navigator>
  );
};

export default PregnancyStackScreen;
