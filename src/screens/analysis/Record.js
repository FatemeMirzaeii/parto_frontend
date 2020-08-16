import React from 'react';
import { View, Text } from 'react-native';

const Record = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: '90%',
            height: '90%',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#BFBFBF',
          }}></View>
      </View>
      <View
        style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: '90%',
            height: '90%',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#BFBFBF',
          }}></View>
      </View>
    </View>
  );
};

export default Record;
