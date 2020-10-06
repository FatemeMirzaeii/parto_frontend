import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeStack from './HomeStack';
import ArticleStack from './ArticleStack';
import MenuStack from './MenuStack';
import Analysis from '../screens/analysis';
import { COLOR, FONT, SIZE } from '../styles/static';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let type;
          switch (route.name) {
            case 'Home':
              type = focused ? 'feather' : 'font-awesome-5';
              iconName = 'moon';
              break;
            case 'Articles':
              type = 'feather';
              iconName = focused ? 'book-open' : 'book';
              break;
            case 'Analysis':
              type = 'antdesign';
              iconName = focused ? 'barchart' : 'barschart';
              break;
            case 'Menu':
              type = 'antdesign';
              iconName = focused ? 'menuunfold' : 'menufold';
              break;
            default:
              break;
          }
          return <Icon name={iconName} size={20} color={color} type={type} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.btn,
        inactiveTintColor: COLOR.black,
        style: {
          backgroundColor: 'rgba(253, 241, 241, 0.9)',
          // backgroundColor: 'rgba(22, 22, 22, 0.2)',
          // backgroundColor: 'rgba(235, 184, 197, 0.2)',
          // backgroundColor: 'transparent',
          borderWidth: 0,
          position: 'absolute',
          elevation: 0,
        },
        labelStyle: {
          fontFamily: FONT.bold,
          fontSize: SIZE[14],
        },
      }}>
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarLabel: 'بیشتر',
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticleStack}
        options={{
          tabBarLabel: 'مقالات',
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarLabel: 'تحلیل',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'ماه من',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
