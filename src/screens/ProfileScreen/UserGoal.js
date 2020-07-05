import React, { createRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
const UserGoal = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>هدف من</Text>
      </View>
      <View style={styles.goals}>
        <TouchableOpacity
          style={[
            styles.goal,
            {
              backgroundColor: 'pink',
            },
          ]}>
          <Text style={styles.text}>ثبت روزهای قرمز</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goal}>
          <Text style={styles.text}>اقدام برای بارداری</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goal}>
          <Text style={styles.text}>بارداری</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default UserGoal;
