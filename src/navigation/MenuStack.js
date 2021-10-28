import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../screens/menu';
import Profile from '../screens/profile';
import CycleSetting from '../screens/cycle-setting';
import Reminders from '../screens/reminders';
import ReminderSetting from '../screens/reminders/ReminderSetting';
import BreastExamHelp from '../screens/reminders/BreastExamHelp';
import Lock from '../screens/lock';
import PasscodeSetting from '../screens/lock/passcodeSetting';
import ContactUs from '../screens/contact-us';
import Rating from '../screens/rating';
import AboutUs from '../screens/about-us';
import TermsOfUse from '../screens/terms-of-use';
import Treatise from '../screens/treatise';
import TreatiseList from '../screens/treatise/TreatiseList';
import TreatiseDetails from '../screens/treatise/TreatiseDetails';
import TreatiseHelp from '../screens/treatise/TreatiseHelp';
import Assistant from '../screens/assistant';
import PartnerVerificationCode from '../screens/partner-verification-code';
import Note from '../screens/note';
import NoteList from '../screens/note/NotesList';
import { FONT } from '../styles/static';

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
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="CycleSettings" component={CycleSetting} />
      <MenuStack.Screen name="Lock" component={Lock} />
      <MenuStack.Screen name="PasscodeSetting" component={PasscodeSetting} />
      <MenuStack.Screen name="Reminders" component={Reminders} />
      <MenuStack.Screen name="ReminderSetting" component={ReminderSetting} />
      <MenuStack.Screen name="BreastExamHelp" component={BreastExamHelp} />
      <MenuStack.Screen name="Treatise" component={Treatise} />
      <MenuStack.Screen name="TreatiseList" component={TreatiseList} />
      <MenuStack.Screen name="TreatiseDetails" component={TreatiseDetails} />
      <MenuStack.Screen name="TreatiseHelp" component={TreatiseHelp} />
      <MenuStack.Screen name="ContactUs" component={ContactUs} />
      <MenuStack.Screen name="Rating" component={Rating} />
      <MenuStack.Screen name="AboutUs" component={AboutUs} />
      <MenuStack.Screen name="TermsOfUse" component={TermsOfUse} />
      <MenuStack.Screen name="Assistant" component={Assistant} />
      <MenuStack.Screen name="Note" component={Note} />
      <MenuStack.Screen name="NoteList" component={NoteList} />

      <MenuStack.Screen
        name="PartnerVerificationCode"
        component={PartnerVerificationCode}
      />
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;
