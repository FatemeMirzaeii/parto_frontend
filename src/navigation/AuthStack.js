import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/signup';
import Login from '../screens/login';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          animationTypeForReplace: authState.isSignout ? 'pop' : 'push',
        }}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
