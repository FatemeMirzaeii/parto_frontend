import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

//screens
import Interview from '../screens/interview';
import Q2 from '../screens/interview/last-period-date-Q2';
import Q3 from '../screens/interview/period-length-Q3';
import Q4 from '../screens/interview/cycle-length-Q4';
import Q5 from '../screens/interview/teenagerQ1';
import Pregnancy_Q2 from '../screens/interview/pregnancy-week-Q2';
import Pregnancy_Q3 from '../screens/interview/determine-week-Q3';
import Pregnancy_Q4 from '../screens/interview/pregnancy-calendar-Q4';
import Notice from '../screens/interview/notice';
import Template from '../screens/template';

const InterviewStack = createStackNavigator();


const modeState = useSelector((state) => state.template.mode);
  console.log('mod of app$$$$$$$$$$$$',modeState) 

const InterviewStackScreen = () => {
      return (
        <InterviewStack.Navigator screenOptions={{ headerShown: false }}>
          <InterviewStack.Screen name="Template" component={Template} />
          <InterviewStack.Screen name="Interview" component={Interview} />
          <InterviewStack.Screen name="Q2" component={Q2} />
          <InterviewStack.Screen name="Q3" component={Q3} />
          <InterviewStack.Screen name="Q4" component={Q4} />
          <InterviewStack.Screen name="Q5" component={Q5} />
          <InterviewStack.Screen name="Pregnancy_Q2" component={Pregnancy_Q2} />
          <InterviewStack.Screen name="Pregnancy_Q3" component={Pregnancy_Q3} />
          <InterviewStack.Screen name="Pregnancy_Q4" component={Pregnancy_Q4} />
          <InterviewStack.Screen name="Notice" component={Notice} />
        </InterviewStack.Navigator>

      );
      
};
export default InterviewStackScreen;


