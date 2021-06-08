import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { COLOR, WIDTH } from '../styles/static';

const RtlSnackBar = (props) => {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismiss}
      action={{
        label: 'باشه',
        onPress: () => {
          // Do something
        },
      }}
      style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
    </Snackbar>
  );
};
const styles = StyleSheet.create({
  container: {
    bottom: 55,
    flexDirection: 'row-reverse',
  },
  messageContainer: { width: WIDTH / 1.4 },
  message: { color: COLOR.white },
});
export default RtlSnackBar;
