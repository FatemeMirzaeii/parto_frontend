import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../screens/menu';
import Profile from '../screens/profile';
import CycleSetting from '../screens/cycle-setting';
import Reminders from '../screens/reminders';
import ReminderSetting from '../screens/reminders/ReminderSetting';
// import ArticleStack from './ArticleStack';
import ContactUs from '../screens/contact-us';
import Rating from '../screens/rating';
import AboutUs from '../screens/about-us';
import Articles from '../screens/articles';
import ArticlesList from '../screens/articles/ArticlesList';
import ArticleDetails from '../screens/articles/ArticleDetails';

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
        name="ArticleStack"
        component={ArticleStack}
        options={{
          headerTitleStyle: { alignSelf: 'center' },
        }}
      /> */}
      <MenuStack.Screen
        name="Articles"
        component={Articles}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="ArticlesList"
        component={ArticlesList}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen name="ContactUs" component={ContactUs} />
      <MenuStack.Screen name="Rating" component={Rating} />
      <MenuStack.Screen name="AboutUs" component={AboutUs} />
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
