import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

//components
import Card from '../../components/Card';

//styles
import styles from './styles';
import globalStyles from '../../styles/';
import Assistant from '../../../assets/images/assistant.jpg';

const LocalScreen = ({ onPress, goftinoOpen, goftinoReady }) => {
  return (
    <View style={styles.localScreen(goftinoOpen)}>
      <Card>
        <Image style={styles.pic} resizeMode="center" source={Assistant} />
        <Text style={globalStyles.regularTxt}>
          پرتویی عزیز
          {'\n'}
          {'\n'}
          برای پرسیدن سوال جدید لازمه که کیف پولت رو شارژ کرده باشی. هر سوال می
          تونه شامل چندین پرسش و پاسخ از طرف شما و کارشناس پرتو باشه. هر زمانیکه
          کارشناس تشخیص داد، سوال شما به پایان می رسه
          {'\n'}
          از همین جا می‌تونی پرسش و پاسخ‌های قبلی رو بدون پرداخت هزینه، ببینی.
        </Text>
        <Button
          containerStyle={styles.btnContainer}
          loading={!goftinoReady}
          buttonStyle={styles.button}
          titleStyle={styles.text}
          title="شروع گفتگو"
          onPress={onPress}
        />
      </Card>
    </View>
  );
};

export default LocalScreen;
