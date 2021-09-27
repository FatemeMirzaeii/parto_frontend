import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';
import PregnancyProfile from '../screens/pregnancy-profile';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';
import Chat from '../screens/assistant/chat';
import ArticleDetails from '../screens/articles/ArticleDetails';
import Note from '../screens/note';
import NoteList from '../screens/note/NotesList';
import Wallet from '../screens/wallet';
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
        headerShown: false,
      }}>
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
      <HomeStack.Screen name="Note" component={Note} />
      <HomeStack.Screen name="NoteList" component={NoteList} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
