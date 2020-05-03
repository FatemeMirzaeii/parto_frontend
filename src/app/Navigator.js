import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
// import All Screens
import Home from '../screens/HomeScreen/Home';
import Calendar from '../screens/CalendarScreen/Calendar';
import Charts from '../screens/ChartsScreen/Charts';




const PagesNavigator = createStackNavigator(
    {
        Calendar: {
            screen: Calendar,
            navigationOptions: { headerShown: false },
        },

        Charts: {
            screen: Charts,
            navigationOptions: { headerShown: false },
        },

        Home: {
            screen: Home,
            navigationOptions: { headerShown: false },
        },

    },
    // { initialRouteName: 'Home' },
);

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { headerShown: false },
        },

        // },
        // {
        //   contentComponent: props => <DrawerView {...props} />,
    },
);

const StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { headerShown: false },
    },
    // SplashScreen: {
    //   screen: SplashScreen,
    //   navigationOptions: { headerShown: false },
    // },

});
export const AppSwitchNavigator = createSwitchNavigator(
    {
        Auth: {
            screen: StackNavigator,
            navigationOptions: { headerShown: false },
        },
        App: {
            screen: DrawerNavigator,
            navigationOptions: { headerShown: false },
        },
        Second: {
            screen: PagesNavigator,
            navigationOptions: { headerShown: false },
        }
    },
    // { initialRouteName: 'Auth' },
    { initialRouteName: 'Second' },
);
