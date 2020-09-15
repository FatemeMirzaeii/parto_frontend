import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Articles from '../screens/articles';
import ArticlesList from '../screens/articles/ArticlesList';
import ArticleDetails from '../screens/articles/ArticleDetails';
import Treatise from '../screens/articles/Treatise';

const ArticleStack = createStackNavigator();

const ArticleStackScreen = () => {
  return (
    <ArticleStack.Navigator screenOptions={{ headerShown: false }}>
      <ArticleStack.Screen name="Articles" component={Articles} />
      <ArticleStack.Screen name="ArticlesList" component={ArticlesList} />
      <ArticleStack.Screen name="ArticleDetails" component={ArticleDetails} />
    </ArticleStack.Navigator>
  );
};
export default ArticleStackScreen;
