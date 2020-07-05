import React, { createRef } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import styles from './Styles';
const UserGoal = ({ navigation }) => {
  return (
    <View>
      <Card title="هدف من" wrapperStyle={{ flexDirection: 'row' }}>
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
      </Card>
    </View>
  );
};
export default UserGoal;
