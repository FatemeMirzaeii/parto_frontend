import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
// import All Screens
import Home from '../screens/HomeScreen/Home';
import Calendar from '../screens/CalendarScreen/Calendar';
import TrackingOptions from '../screens/TrackingOptionsScreen/TrackingOptions';
import Charts from '../screens/ChartsScreen/Charts';
import TestApk from '../screens/HomeScreen/TestApk';
import htmlLoader from '../screens/HomeScreen/htmlLoader';
import StartQuestion from '../screens/StartScreen/StartQuestion';
import StartQuestion2 from '../screens/StartScreen/StartQuestion2';


const PagesNavigator = createStackNavigator(

  {
    StartQuestion: {
      screen: StartQuestion,
      navigationOptions: { headerShown: false },
    },
    StartQuestion2: {
      screen: StartQuestion2,
      navigationOptions: { headerShown: false },
    },
    Home: {
      screen: Home,
      navigationOptions: { headerShown: false },
    },
    htmlLoader: {
      screen: htmlLoader,
      navigationOptions: { headerShown: false },
    },

    htmlLoader: {
      screen: htmlLoader,
      navigationOptions: { headerShown: false },
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: { headerShown: false },
    },
    TrackingOptions: {
      screen: TrackingOptions,
      navigationOptions: { headerShown: false },
    },
    Charts: {
      screen: Charts,
      navigationOptions: { headerShown: false },
    },
    TestApk: {
      screen: TestApk,
      navigationOptions: { headerShown: false },
    },


  },
  // { initialRouteName: 'Home' },
);

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },

  // },
  // {
  //   contentComponent: props => <DrawerView {...props} />,
});

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
  // SplashScreen: {
  //   screen: SplashScreen,
  //   navigationOptions: { headerShown: false },
  // },
});
export const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: StackNavigator,
      navigationOptions: { headerShown: false },
    },
    App: {
      screen: DrawerNavigator,
      navigationOptions: { headerShown: false },
    },
    Second: {
      screen: PagesNavigator,
      navigationOptions: { headerShown: false },
    },
  },
  // { initialRouteName: 'Auth' },
  { initialRouteName: 'Second' },
);
