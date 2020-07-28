import React, { useEffect, useReducer, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../contexts/AuthContext';
import { getData, removeData } from '../app/Functions';
// import All Screens
import Splash from '../screens/SplashScreen/Splash';
import SignUp from '../screens/SignUpScreen/SignUp';
import Login from '../screens/LoginScreen/Login';
import Home from '../screens/HomeScreen/Home';
import Calendar from '../screens/CalendarScreen/Calendar';
import TrackingOptions from '../screens/TrackingOptionsScreen/TrackingOptions';
import Menu from '../screens/MenuScreen/Menu';
import Profile from '../screens/ProfileScreen/Profile';
import CycleSettings from '../screens/CycleSettingsScreen/CycleSettings';
import Reminders from '../screens/RemindersScreen/Reminders';
import ReminderSetting from '../screens/RemindersScreen/ReminderSetting';
import Charts from '../screens/ChartsScreen/Charts';
import StartQuestion from '../screens/StartScreen/StartQuestion';
import StartQuestion2 from '../screens/StartScreen/StartQuestion2';
import StartQuestion3 from '../screens/StartScreen/StartQuestion3';
import StartQuestion4 from '../screens/StartScreen/StartQuestion4';
import StartQuestion5 from '../screens/StartScreen/StartQuestion5';
import StartQuestionpragnent from '../screens/StartScreen/StartQuestionpragnent';
import StartQuestionPregnancyForget from '../screens/StartScreen/StartQuestionPregnancyForget';
import pregnancyCalendar from '../screens/StartScreen/pregnancyCalendar';
import ContactUs from '../screens/ContactUsScreen/ContactUs';
import Scoring from '../screens/ScoringScreen/Scoring';
const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Calendar" component={Calendar} />
      <HomeStack.Screen name="TrackingOptions" component={TrackingOptions} />
      <HomeStack.Screen name="ContactUs" component={ContactUs} />
      <HomeStack.Screen name="Scoring" component={Scoring} />
    </HomeStack.Navigator>
  );
};

const CalendarStack = createStackNavigator();
const CalendarStackScreen = () => {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="Calendar" component={Calendar} />
      <CalendarStack.Screen
        name="TrackingOptions"
        component={TrackingOptions}
      />
    </CalendarStack.Navigator>
  );
};

const MenuStack = createStackNavigator();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="CycleSettings"
        component={CycleSettings}
        options={{
          title: 'تنظیمات دوره‌ها',
          headerTitleStyle: { alignSelf: 'center' },
        }}
      />
      <MenuStack.Screen
        name="Reminders"
        component={Reminders}
        options={{
          title: 'یادآوری‌ها',
          headerTitleStyle: { alignSelf: 'center' },
        }}
      />
      <MenuStack.Screen
        name="ReminderSetting"
        component={ReminderSetting}
        options={{
          headerTitleStyle: { alignSelf: 'center' },
        }}
      />
    </MenuStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const InterviewStack = createStackNavigator();
const InterviewStackScreen = () => {
  return (
    <InterviewStack.Navigator screenOptions={{ headerShown: false }}>
      <InterviewStack.Screen name="StartQuestion" component={StartQuestion} />
      <InterviewStack.Screen
        name="StartQuestionpragnent"
        component={StartQuestionpragnent}
      />
      <InterviewStack.Screen name="StartQuestion2" component={StartQuestion2} />
      <InterviewStack.Screen name="StartQuestion3" component={StartQuestion3} />
      <InterviewStack.Screen name="StartQuestion4" component={StartQuestion4} />
      <InterviewStack.Screen name="StartQuestion5" component={StartQuestion5} />
      <InterviewStack.Screen
        name="StartQuestionPregnancyForget"
        component={StartQuestionPregnancyForget}
      />
      <InterviewStack.Screen
        name="pregnancyCalendar"
        component={pregnancyCalendar}
      />
    </InterviewStack.Navigator>
  );
};
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            //todo: should change focused icon.
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
          return <AntDesign name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
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
      }}>
      <Tab.Screen name="Charts" component={Charts} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Calendar" component={CalendarStackScreen} />
      <Tab.Screen name="Menu" component={MenuStackScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            interviewToken: action.iToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'INTERVIEW':
          return {
            ...prevState,
            interviewToken: action.iToken,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      interviewToken: null,
    },
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let interviewToken;
      try {
        userToken = await getData('@token');
        interviewToken = await getData('@startPages');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken,
        iToken: interviewToken,
      });
    };
    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async (dummyToken) => {
        dispatch({
          type: 'SIGN_IN',
          token: dummyToken ? dummyToken : await getData('@token'),
        });
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT', token: await removeData('@token') });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: await getData('@token') });
      },
      interview: async () => {
        dispatch({ type: 'INTERVIEW', iToken: await getData('@startPages') });
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      {state.isLoading ? (
        <Splash /> //todo: need timout
      ) : state.userToken && state.interviewToken ? (
        <TabNavigator />
      ) : !state.userToken ? (
        <AuthStackScreen />
      ) : (
        <InterviewStackScreen />
      )}
    </AuthContext.Provider>
  );
};
export default AppNavigator;
