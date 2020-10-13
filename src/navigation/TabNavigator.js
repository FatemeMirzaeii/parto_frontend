import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import HomeStack from './HomeStack';
import ArticleStack from './ArticleStack';
import MenuStack from './MenuStack';
import Analysis from '../screens/analysis';
import TrackingOptions from '../screens/tracking-options';
import { DateContext } from '../contexts';
import { COLOR, FONT, SIZE } from '../styles/static';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <DateContext.Provider value={{ today: moment() }}>
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
            // elevation: 0,
            padding: 5,
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
          name="TrackingOptions"
          component={TrackingOptions}
          options={{
            tabBarButton: (props) => (
              <Icon
                {...props}
                raised
                name="plus"
                type="octicon"
                color={COLOR.btn}
                size={25}
                containerStyle={{ bottom: 35,borderColor:'#aaa', borderWidth:0.2 }}
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
          component={HomeStack}
          options={{
            tabBarLabel: 'ماه من',
          }}
        />
      </Tab.Navigator>
    </DateContext.Provider>
  );
};

export default TabNavigator;
