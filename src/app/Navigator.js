import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import All Screens
import Home from '../screens/HomeScreen/Home';
import Calendar from '../screens/CalendarScreen/Calendar';
import TrackingOptions from '../screens/TrackingOptionsScreen/TrackingOptions';
import SignUp from '../screens/SignUpScreen/SignUp';
import Login from '../screens/LoginScreen/Login';
import Profile from '../screens/ProfileScreen/Profile';
import Menu from '../screens/MenuScreen/Menu';
import Charts from '../screens/ChartsScreen/Charts';
import htmlLoader from '../screens/HomeScreen/htmlLoader';
import StartQuestion from '../screens/StartScreen/StartQuestion';
import StartQuestion2 from '../screens/StartScreen/StartQuestion2';
import StartQuestion3 from '../screens/StartScreen/StartQuestion3';
import StartQuestion4 from '../screens/StartScreen/StartQuestion4';
import StartQuestion5 from '../screens/StartScreen/StartQuestion5';
import StartQuestionpragnent from '../screens/StartScreen/StartQuestionpragnent';
import Splash from '../screens/SplashScreen/Splash';
import StartQuestionPregnancyForget from '../screens/StartScreen/StartQuestionPregnancyForget';
import pregnancyCalendar from '../screens/StartScreen/pregnancyCalendar';

const HomeStack = createStackNavigator(
  {
    Home,
    Calendar,
    TrackingOptions,
    htmlLoader,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  },
);
const CalendarStack = createStackNavigator(
  {
    Calendar,
    TrackingOptions,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  },
);
const MenuStack = createStackNavigator(
  {
    Menu,
    Profile,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  },
);
const AuthStack = createStackNavigator(
  {
    Splash,
    Login,
    SignUp,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  },
);
const InterviewStack = createStackNavigator(
  {
    StartQuestion,
    StartQuestionpragnent,
    StartQuestion2,
    StartQuestion3,
    StartQuestion4,
    StartQuestion5,
    StartQuestionPregnancyForget,
    pregnancyCalendar,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  },
);
const TabNavigator = createBottomTabNavigator(
  {
    Menu: MenuStack,
    Calendar: CalendarStack,
    Home: HomeStack,
    Charts,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = focused ? 'home' : 'home';
            break;
          case 'Calendar':
            iconName = focused ? 'calendar' : 'calendar';
            break;
          case 'Charts':
            iconName = focused ? 'linechart' : 'linechart';
            break;
          case 'Menu':
            iconName = focused ? 'profile' : 'profile';
            break;
          default:
            break;
        }
        return <AntDesign name={iconName} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        borderWidth: 1,
        borderTopWidth: 1,
        borderColor: 'gray',
      },
    },
  },
);
export const AppSwitchNavigator = createSwitchNavigator({
  Auth: AuthStack,
  Interview: InterviewStack,
  App: TabNavigator,
});
