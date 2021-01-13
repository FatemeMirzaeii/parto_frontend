import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const [appTourTargets, setAppTourTargets] = useState([]);
  const template = useSelector((state) => state.user);
  Tour(appTourTargets, 'plusIcon', 'TabTour');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      activeColor={COLOR.white}
      inactiveColor={COLOR.white}
      // theme={{ mode: 'exact', fonts: FONT.bold }}
      barStyle={{
        backgroundColor: 'transparent',
        elevation: 0,
        position: 'absolute',
      }}
      // backgroundColor: 'rgba(253, 241, 241, 0.9)',
      // backgroundColor: 'rgba(22, 22, 22, 0.2)',
      // backgroundColor: 'rgba(235, 184, 197, 0.2)',
    >
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarLabel: 'بیشتر',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="more" size={20} color={color} type="parto" />
          ),
          tabBarColor: 'rgba(22, 22, 22, 0.2)',
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticleStack}
        options={{
          tabBarLabel: 'مقالات',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="article" size={25} color={color} type="parto" />
          ),
          tabBarColor: 'rgba(22, 22, 22, 0.2)',
        }}
      />
      <Tab.Screen
        name="TempTrackingOption"
        component={TrackingOptions}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={{
          tabBarLabel: 'ثبت پریود',
          // tabBarIcon: (props) => (
          //   <PlusButton
          //     {...props}
          //     addAppTourTarget={(appTourTarget) => {
          //       appTourTargets.push(appTourTarget);
          //     }}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarLabel: 'تحلیل',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="barchart" size={20} color={color} type="parto" />
          ),
          tabBarColor: 'rgba(22, 22, 22, 0.2)',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'ماه من',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="moon" size={25} color={color} type="parto" />
          ),
          // tabBarColor: COLOR.purple,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
