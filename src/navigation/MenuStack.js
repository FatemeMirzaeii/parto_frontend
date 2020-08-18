import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../screens/menu';
import Profile from '../screens/profile';
import CycleSetting from '../screens/cycle-setting';
import Reminders from '../screens/reminders';
import ReminderSetting from '../screens/reminders/ReminderSetting';

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
        component={CycleSetting}
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
      {/* <MenuStack.Screen
        name="Story"
        // component={ReminderSetting}
        options={{
          headerTitleStyle: { alignSelf: 'center' },
        }}
      /> */}
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;
