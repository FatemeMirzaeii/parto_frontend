import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
// import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      {/* <HomeStack.Screen name="Calendar" component={Calendar} /> */}
      <HomeStack.Screen name="TrackingOptions" component={TrackingOptions} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
