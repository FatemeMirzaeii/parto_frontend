import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from './styles';
import { COLOR } from '../../styles/static';

const PregnancyEnd = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const onPress = (i) => {
    setSelectedIndex(i);
    navigation.navigate('PregnancyEndCalendar', { ...route.params, type: i });
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/main/interview.png')}
      style={styles.bg}>
      <ButtonGroup
        onPress={onPress}
        selectedIndex={selectedIndex}
        vertical
        buttons={['تولد نوزاد', 'سقط جنین']}
        containerStyle={{
          height: 150,
          backgroundColor: 'transparent',
          borderWidth: 0,
        }}
        buttonContainerStyle={{
          backgroundColor: COLOR.white,
          elevation: 3,
          borderRadius: 50,
          margin: 10,
        }}
        buttonStyle={{ borderRadius: 50 }}
        selectedButtonStyle={{ backgroundColor: COLOR.btn }}
      />
      {/* <Button
        title="بعدی"
        onPress={async () => {
          console.log('pregnancy end', res);
        }}
        buttonStyle={styles.saveContainer}
        containerStyle={styles.saveButton}
        titleStyle={styles.saveTitle}
      /> */}
    </ImageBackground>
  );
};

export default PregnancyEnd;
