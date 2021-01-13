import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import Home from '../screens/home';
import ArticleStack from './ArticleStack';
import MenuStack from './MenuStack';
import Analysis from '../screens/analysis';
import TrackingOptions from '../screens/tracking-options';
import { COLOR, FONT } from '../styles/static';
import PlusButton from '../components/PlusButton';
import Tour from '../util/tourGuide/Tour';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const [appTourTargets, setAppTourTargets] = useState([]);
  const template = useSelector((state) => state.user);
  Tour(appTourTargets, 'plusIcon', 'TabTour');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let type;
          switch (route.name) {
            case 'Home':
              type = 'parto';
              iconName = 'moon';
              break;
            case 'Articles':
              type = 'parto';
              iconName = 'article';
              break;
            case 'Analysis':
              type = 'parto';
              iconName = focused ? 'barchart' : 'linechart';
              break;
            case 'Menu':
              type = 'parto';
              iconName = 'more';
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
          // backgroundColor: 'rgba(253, 241, 241, 0.9)',
          // backgroundColor: 'rgba(22, 22, 22, 0.2)',
          // backgroundColor: 'rgba(235, 184, 197, 0.2)',
          backgroundColor: 'transparent',
          borderWidth: 0,
          position: 'absolute',
          elevation: 0,
          padding: 5,
          height: 55,
        },
        labelStyle: {
          fontFamily: FONT.bold,
          fontSize: 13,
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
        name="TrackingOptions"
        component={TrackingOptions}
        options={{
          // tabBarVisible: false,
          tabBarLabel: 'ثبت پریود',
          tabBarIcon: (props) => (
            <PlusButton
              {...props}
              addAppTourTarget={(appTourTarget) => {
                appTourTargets.push(appTourTarget);
              }}
            />
          ),
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
        component={Home}
        options={{
          tabBarLabel: 'ماه من',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
