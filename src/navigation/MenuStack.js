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
import TreatiseStack from './TreatiseStack';
import Treatise from '../screens/treatise';
import TreatiseList from '../screens/treatise/TreatiseList';
import TreatiseDetails from '../screens/treatise/TreatiseDetails';
import TreatiseHelp from '../screens/treatise/TreatiseHelp';

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
      <MenuStack.Screen name="CycleSettings" component={CycleSetting} />
      <MenuStack.Screen name="PregnancyProfile" component={PregnancyProfile} />
      <MenuStack.Screen name="Reminders" component={Reminders} />
      <MenuStack.Screen name="ReminderSetting" component={ReminderSetting} />
      {/* <MenuStack.Screen
        name="ArticleStack"
        component={ArticleStack}
        options={{
          headerTitleStyle: { alignSelf: 'center' },
        }}
      /> */}
      {/* <MenuStack.Screen
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
      /> */}
      <MenuStack.Screen
        name="TreatiseStack"
        component={TreatiseStack}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen name="Treatise" component={Treatise} />
      <MenuStack.Screen name="TreatiseList" component={TreatiseList} />
      <MenuStack.Screen name="TreatiseDetails" component={TreatiseDetails} />
      <MenuStack.Screen name="TreatiseHelp" component={TreatiseHelp} />
      <MenuStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;
