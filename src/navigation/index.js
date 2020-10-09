import React, { useEffect, useReducer, useMemo, useState } from 'react';
import { AuthContext } from '../contexts';
import { getData, removeData } from '../util/func';
import Splash from '../screens/splash';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import InterviewStack from './InterviewStack';

const AppNavigator = () => {
  const [splash, setSplash] = useState(true);
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            interviewToken: action.iToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'INTERVIEW':
          return {
            ...prevState,
            interviewToken: action.iToken,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      interviewToken: null,
    },
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let interviewToken;
      try {
        userToken = await getData('@token');
        interviewToken = await getData('@startPages');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken,
        iToken: interviewToken,
      });
    };
    setTimeout(() => setSplash(false), 1000);
    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async (dummyToken) => {
        dispatch({
          type: 'SIGN_IN',
          token: dummyToken ? dummyToken : await getData('@token'),
        });
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT', token: await removeData('@token') });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: await getData('@token') });
      },
      interview: async () => {
        dispatch({ type: 'INTERVIEW', iToken: await getData('@startPages') });
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      {state.isLoading || splash ? (
        <Splash />
      ) : state.interviewToken ? ( //state.userToken &&
        <TabNavigator />
      ) : (
        // ) : !state.userToken ? (
        //   <AuthStack />
        <InterviewStack />
      )}
    </AuthContext.Provider>
  );
};
export default AppNavigator;
