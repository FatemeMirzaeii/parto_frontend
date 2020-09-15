import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStack from './HomeStack';
import ArticleStack from './ArticleStack';
import MenuStack from './MenuStack';
import Analysis from '../screens/analysis';
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
            case 'Articles':
              iconName = focused ? 'book' : 'book';
              break;
            case 'Analysis':
              iconName = focused ? 'barschart' : 'barschart';
              break;
            case 'Menu':
              iconName = focused ? 'menufold' : 'menufold';
              break;
            default:
              break;
          }
          return <AntDesign name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.btn,
        inactiveTintColor: COLOR.nextPage,
        showLabel: false,
        style: {
          backgroundColor: COLOR.lightPink,
        },
      }}>
      <Tab.Screen name="Analysis" component={Analysis} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Articles" component={ArticleStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
