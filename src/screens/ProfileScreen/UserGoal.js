import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
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
      <View style={styles.goals}>
        <ButtonGroup
          onPress={setMode}
          selectedIndex={mode}
          buttons={modes}
          containerStyle={styles.goal}
          selectedButtonStyle={{ backgroundColor: 'pink' }}
          textStyle={styles.text}
        />
        {/* <TouchableOpacity onPress={() => {}} style={styles.goal}>
          <Text style={styles.text}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goal}>
          <Text style={styles.text}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goal}>
          <Text style={styles.text}></Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
export default UserGoal;
