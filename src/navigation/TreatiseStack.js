import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Treatise from '../screens/treatise';
import TreatiseList from '../screens/treatise/TreatiseList';
import TreatiseDetails from '../screens/treatise/TreatiseDetails';
import TreatiseHelp from '../screens/treatise/TreatiseHelp';

const TreatiseStack = createStackNavigator();

const TreatiseStackScreen = () => {
  return (
    <TreatiseStack.Navigator>
      <TreatiseStack.Screen name="Treatise" component={Treatise} />
      <TreatiseStack.Screen name="TreatiseList" component={TreatiseList} />
      <TreatiseStack.Screen
        name="TreatiseDetails"
        component={TreatiseDetails}
      />
      <TreatiseStack.Screen name="TreatiseHelp" component={TreatiseHelp} />
    </TreatiseStack.Navigator>
  );
};
export default TreatiseStackScreen;
