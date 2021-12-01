import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
import DialogBox from '../../components/DialogBox';
import { COLOR } from '../../styles/static';
import styles from './styles';

const CalendarGuide = (props) => {
  const template = useSelector((state) => state.user.template);
  const infoArray =
    template !== 'Teenager'
      ? [
          { txt: 'پریود', color: COLOR.bleeding },
          { txt: 'پیش‌بینی پریود', color: COLOR.periodPerdiction },
          { txt: 'تخمک‌گذاری', color: COLOR.ovulationPerdictions },
        ]
      : [
          { txt: 'پریود', color: COLOR.bleeding },
          { txt: 'پیش‌بینی پریود', color: COLOR.periodPerdiction },
        ];

  return (
    <DialogBox
      isVisible={props.isVisible}
      hide={props.toggle}
      onRequestClose={() => {
        return;
      }}
      text="راهنمای تقویم"
      icon={<Icon type="parto" name="info" color="#aaa" size={50} />}
      firstBtnTitle="بستن"
      firstBtnPress={props.toggle}>
      <View style={styles.dialogBoxWrapper}>
        {infoArray &&
          infoArray.map((item, index) => {
            return (
              <View key={index.toString()} style={styles.dialogBoxDescription}>
                <Text style={styles.dialogBoxTxt}>{item.txt}</Text>
                <View style={styles.dialogBoxLine(item.color)} />
              </View>
            );
          })}
        <Divider />
        <View style={styles.dialogBoxDescription}>
          <Text style={styles.dialogBoxTxt}>افزودن/ ویرایش یادداشت</Text>
          <Icon
            containerStyle={styles.dialogBoxIcon}
            size={24}
            name="new-message"
            type="entypo"
            color={COLOR.pink}
          />
        </View>
        <View style={styles.dialogBoxDescription}>
          <Text style={styles.dialogBoxTxt}>افزودن/ ویرایش شرح‌حال</Text>
          <Icon
            containerStyle={styles.dialogBoxIcon}
            size={24}
            name="lady"
            type="parto"
            color={COLOR.pink}
          />
        </View>
      </View>
    </DialogBox>
  );
};
export default CalendarGuide;
