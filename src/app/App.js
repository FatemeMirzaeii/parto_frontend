import React from 'react';
import { createAppContainer } from 'react-navigation';
import { AppSwitchNavigator } from './Navigator';

console.disableYellowBox = true;

const AppContainer = createAppContainer(AppSwitchNavigator);

const App = (props) => {
  return (
    // <Provider >
    <AppContainer />
    // </Provider>
  );
};
export default App;
