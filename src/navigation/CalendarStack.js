import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import All Screens
import Calendar from '../screens/calendar';
import TrackingOptions from '../screens/tracking-options';

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

export default CalendarStackScreen;
