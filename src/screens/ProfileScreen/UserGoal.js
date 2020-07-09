import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from './Styles';
const UserGoal = () => {
  const [mode, setMode] = useState();
  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>هدف من</Text>
      </View>
      <ButtonGroup
        onPress={setMode}
        selectedIndex={mode}
        buttons={modes}
        containerStyle={styles.goals}
        selectedButtonStyle={{ backgroundColor: 'pink' }}
        textStyle={styles.text}
        innerBorderStyle={{ width: 0 }}
        buttonStyle={styles.goal}
      />
    </SafeAreaView>
  );
};
export default UserGoal;
