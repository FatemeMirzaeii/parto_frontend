import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
// import OneSignal from 'react-native-onesignal';

export default class Main extends Component {
    constructor(properties) {
        super(properties);
        // OneSignal.init("aef2457f-268f-48f0-b55b-9dbf265a1049");
    }

    render() {
        return <App />;
    }
}
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Main));
