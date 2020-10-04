import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../screens/menu';
import Profile from '../screens/profile';
import CycleSetting from '../screens/cycle-setting';
import PregnancyProfile from '../screens/pregnancy-profile';
import Reminders from '../screens/reminders';
import ReminderSetting from '../screens/reminders/ReminderSetting';
import ContactUs from '../screens/contact-us';
import Rating from '../screens/rating';
import AboutUs from '../screens/about-us';
import Treatise from '../screens/treatise';
import TreatiseList from '../screens/treatise/TreatiseList';
import TreatiseDetails from '../screens/treatise/TreatiseDetails';
import TreatiseHelp from '../screens/treatise/TreatiseHelp';
import { FONT } from '../styles/static';
import PregnancyEnd from '../screens/pregnancy-profile/pregnancy-end';
import PregnancyEndCalendar from '../screens/pregnancy-profile/pregnancy-end-cal';

const MenuStack = createStackNavigator();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'flex-end',
          color: 'black',
          fontSize: 17,
          fontFamily: FONT.medium,
        },
      }}>
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
      <MenuStack.Screen name="CycleSettings" component={CycleSetting} />
      <MenuStack.Screen name="PregnancyProfile" component={PregnancyProfile} />
      <MenuStack.Screen
        name="PregnancyEnd"
        component={PregnancyEnd}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="PregnancyEndCalendar"
        component={PregnancyEndCalendar}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen name="Reminders" component={Reminders} />
      <MenuStack.Screen name="ReminderSetting" component={ReminderSetting} />
      <MenuStack.Screen name="Treatise" component={Treatise} />
      <MenuStack.Screen name="TreatiseList" component={TreatiseList} />
      <MenuStack.Screen name="TreatiseDetails" component={TreatiseDetails} />
      <MenuStack.Screen name="TreatiseHelp" component={TreatiseHelp} />
      <MenuStack.Screen name="ContactUs" component={ContactUs} />
      <MenuStack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen name="AboutUs" component={AboutUs} />
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;
