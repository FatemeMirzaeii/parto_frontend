import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';
import PregnancyProfile from '../screens/pregnancy-profile';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';
import Passcode from '../screens/passcode';
import Chat from '../screens/assistant/chat';
import ArticleDetails from '../screens/articles/ArticleDetails';
import Note from '../screens/note';
import NoteEdit from '../screens/note/NoteEdit';
import Wallet from '../screens/wallet';
import Assistant from '../screens/assistant';
import ContactUs from '../screens/contact-us';
import { FONT } from '../styles/static';
//redux
import { useSelector } from 'react-redux';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  const lockType = useSelector((state) => state.user.lockType);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'flex-end',
          color: 'black',
          fontSize: 17,
          fontFamily: FONT.medium,
        },
        headerShown: false,
      }}>
      {lockType === 'Passcode' ? (
        <HomeStack.Screen
          name="Passcode"
          component={Passcode}
          options={{ headerShown: false }}
        />
      ) : null}
      <HomeStack.Screen name="Tabs" component={TabNavigator} />
      <HomeStack.Screen name="Calendar" component={Calendar} />
      <HomeStack.Screen name="TrackingOptions" component={TrackingOptions} />
      <HomeStack.Screen
        name="PregnancyProfile"
        component={PregnancyProfile}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen name="PregnancyEnd" component={PregnancyEnd} />
      <HomeStack.Screen
        name="PregnancyEndCalendar"
        component={PregnancyEndCalendar}
      />
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen name="ArticleDetails" component={ArticleDetails} />
      <HomeStack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="Note"
        component={Note}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="NoteEdit"
        component={NoteEdit}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="Assistant"
        component={Assistant}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen name="ContactUs" component={ContactUs} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
