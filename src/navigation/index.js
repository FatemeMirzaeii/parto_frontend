import React from 'react';
// import { useSelector } from 'react-redux';
import { DateContext } from '../contexts';
import AuthStack from './AuthStack';
import InterviewStack from './InterviewStack';
import HomeStackScreen from './HomeStack';
import moment from 'moment';
import { FORMAT } from '../constants/cycle';
import { getData } from '../util/func';

const AppNavigator = () => {
  // const authStates = useSelector((state) => state.auth);
  const userToken = getData('@token');
  const interviewToken = getData('@startPages');
  // correct way to read tokens is reading them from redux store, but in order to its unperdictable behavior and late loading,
  // we will read them here direct from storage.
  return (
    <DateContext.Provider value={{ today: moment().format(FORMAT) }}>
      {interviewToken && userToken ? (
        <HomeStackScreen />
      ) : !userToken ? (
        <AuthStack />
      ) : (
        <InterviewStack />
      )}
    </DateContext.Provider>
  );
};
export default AppNavigator;
