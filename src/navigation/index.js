import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DateContext } from '../contexts';
import AuthStack from './AuthStack';
import InterviewStack from './InterviewStack';
import HomeStackScreen from './HomeStack';
import moment from 'moment';
import { FORMAT } from '../constants/cycle';

let counter = -1;
const AppNavigator = () => {
  const authStates = useSelector((state) => state.auth);
  useEffect(() => {
    console.log('counter 1', counter);
    counter++;
    console.log('counter 2', counter);
  }, []);

  return (
    <DateContext.Provider value={{ today: moment().format(FORMAT) }}>
      {authStates.interviewToken && authStates.userToken ? (
        //||(!authStates.userToken && counter !== 0)
        <HomeStackScreen />
      ) : !authStates.userToken ? (
        <AuthStack />
      ) : (
        <InterviewStack />
      )}
    </DateContext.Provider>
  );
};
export default AppNavigator;
