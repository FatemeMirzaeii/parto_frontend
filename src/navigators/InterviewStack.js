import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartQuestion from '../screens/interview/StartQuestion';
import StartQuestion2 from '../screens/interview/StartQuestion2';
import StartQuestion3 from '../screens/interview/StartQuestion3';
import StartQuestion4 from '../screens/interview/StartQuestion4';
import StartQuestion5 from '../screens/interview/StartQuestion5';
import StartQuestionpragnent from '../screens/interview/StartQuestionpragnent';
import StartQuestionPregnancyForget from '../screens/interview/StartQuestionPregnancyForget';
import pregnancyCalendar from '../screens/interview/pregnancyCalendar';
import Forgetpage from '../screens/interview/Forgetpage';

const InterviewStack = createStackNavigator();
const InterviewStackScreen = () => {
  return (
    <InterviewStack.Navigator screenOptions={{ headerShown: false }}>
      <InterviewStack.Screen name="StartQuestion" component={StartQuestion} />
      <InterviewStack.Screen
        name="StartQuestionpragnent"
        component={StartQuestionpragnent}
      />
      <InterviewStack.Screen name="StartQuestion2" component={StartQuestion2} />
      <InterviewStack.Screen name="StartQuestion3" component={StartQuestion3} />
      <InterviewStack.Screen name="StartQuestion4" component={StartQuestion4} />
      <InterviewStack.Screen name="StartQuestion5" component={StartQuestion5} />
      <InterviewStack.Screen name="Forgetpage" component={Forgetpage} />

      <InterviewStack.Screen
        name="StartQuestionPregnancyForget"
        component={StartQuestionPregnancyForget}
      />
      <InterviewStack.Screen
        name="pregnancyCalendar"
        component={pregnancyCalendar}
      />
    </InterviewStack.Navigator>
  );
};
export default InterviewStackScreen;
