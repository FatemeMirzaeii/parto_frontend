import React from 'react';
import { useSelector } from 'react-redux';
import { DateContext } from '../contexts';
import AuthStack from './AuthStack';
import InterviewStack from './InterviewStack';
import HomeStackScreen from './HomeStack';
import moment from 'moment';
import { FORMAT } from '../constants/cycle';

const AppNavigator = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <DateContext.Provider value={{ today: moment().format(FORMAT) }}>
      {authState.interviewToken && authState.userToken ? (
        <HomeStackScreen />
      ) : !authState.userToken ? (
        <AuthStack />
      ) : (
        <InterviewStack />
      )}
    </DateContext.Provider>
  );
};
export default AppNavigator;
