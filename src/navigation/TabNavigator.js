import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStack from './HomeStack';
import CalendarStack from './CalendarStack';
import MenuStack from './MenuStack';
import Charts from '../screens/charts';
import { COLOR } from '../styles/static';

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
        activeTintColor: COLOR.btn,
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
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Calendar" component={CalendarStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
