import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';
import PregnancyProfile from '../screens/pregnancy-profile';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';
import Chat from '../screens/assistant/chat';
import Note from '../screens/note';
import { FONT } from '../styles/static';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'flex-end',
          color: 'black',
          fontSize: 17,
          fontFamily: FONT.medium,
        },
      }}>
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
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Note"
        component={Note}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
