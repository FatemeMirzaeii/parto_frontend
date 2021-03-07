import React, { useState } from 'react';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';

// screens and stacks
import Home from '../screens/home';
import ArticleStack from './ArticleStack';
import MenuStack from './MenuStack';
import Analysis from '../screens/analysis';
import TrackingOptions from '../screens/tracking-options';

//styles and utils
import { COLOR, FONT } from '../styles/static';
import Tour from '../util/tourGuide/Tour';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const [appTourTargets, setAppTourTargets] = useState([]);
  Tour(appTourTargets, 'plusIcon', 'TabTour');
  //todo: should fix tour for plus icon
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      activeColor={COLOR.pink}
      inactiveColor={COLOR.white}
      barStyle={{
        backgroundColor: 'transparent',
        elevation: 0,
        position: 'absolute',
        overflow: 'visible',
      }}
      // backgroundColor: 'rgba(253, 241, 241, 0.9)',
      // backgroundColor: 'rgba(22, 22, 22, 0.2)',
      // backgroundColor: 'rgba(235, 184, 197, 0.2)',
      // tabBarColor: 'rgba(246, 246, 246, 0.2)',
    >
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          //tabBarLabel: 'بیشتر',
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
              بیشتر
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="more" size={23} color={color} type="parto" />
          ),
          tabBarColor: '#E0E0E0',
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticleStack}
        options={{
          //tabBarLabel: 'مقالات',
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
              مقالات
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="article" size={25} color={color} type="parto" />
          ),
          tabBarColor: '#E0E0E0',
        }}
      />
      {/* <Tab.Screen
        name="TempTrackingOption"
        component={TrackingOptions}
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //   },
        // }}
        options={{
          tabBarLabel: 'ثبت پریود',
          tabBarIcon: (props) => {
            return (
              <View
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: 'red',
                  borderColor: 'yellow',
                  borderRadius: 68,
                  borderWidth: 1,
                  position: 'absolute',
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            );
            // <PlusButton
            //   {...props}
            //   addAppTourTarget={(appTourTarget) => {
            //     appTourTargets.push(appTourTarget);
            //   }}
            // />
          },
        }}
      /> */}
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          //tabBarLabel: 'تحلیل',
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
              تحلیل
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="barchart" size={23} color={color} type="parto" />
          ),
          tabBarColor: '#E0E0E0',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          //tabBarLabel: 'ماه‌من',
          tabBarLabel: (
            <Text
              style={{
                fontFamily: FONT.regular,
                textAlign: 'center',
                color: COLOR.white,
              }}>
              ماه‌من
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="moon" size={23} color={COLOR.white} type="parto" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
