import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import {
  ButtonGroup,
  Overlay,
  Card,
  CheckBox,
  Button,
} from 'react-native-elements';
import moment from 'moment';
import styles from './styles';
import {
  getUserStatus,
  updateUserStatus,
  setPregnancyEnd,
} from '../../util/database/query';
import PregnancyModule from '../../util/pregnancy';
import { COLOR } from '../../styles/static';
import { FORMAT } from '../../constants/cycle';
import PregnancyPicker from '../../components/PregnancyPicker';

const UserGoal = () => {
  const [mode, setMode] = useState();
  const [visible, setVisible] = useState(false);
  const [stratModal, setStartModal] = useState(false);
  const [childBirth, setChildBirth] = useState(false);
  const [abortion, setAbortion] = useState(false);
  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  useEffect(() => {
    getUserStatus().then((res) => {
      if (res) {
        res.pregnant ? setMode(2) : res.pregnancy_try ? setMode(1) : setMode(0);
      }
    });
  }, [mode]);
  const onModePress = (i) => {
    if (mode === 2 && i !== 2) {
      Alert.alert(
        '',
        'آیا میخواهید از حالت بارداری خارج شوید؟',
        [
          {
            text: 'بله',
            onPress: () => {
              i === 0 ? updateUserStatus(0, 0) : updateUserStatus(0, 1);
              setMode(i);
              setVisible(true);
            },
          },
          {
            text: 'خیر',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      switch (i) {
        case 0:
          updateUserStatus(0, 0);
          setMode(i);
          break;
        case 1:
          updateUserStatus(0, 1);
          setMode(i);
          break;
        case 2:
          Alert.alert(
            '',
            'درحال فعالسازی حالت بارداری هستید. آیا مطمئنید؟',
            [
              {
                text: 'بله',
                onPress: () => {
                  updateUserStatus(1, 0);
                  setMode(i);
                  //  setStartModal(true);
                },
              },
              {
                text: 'خیر',
                onPress: () => {
                  return;
                },
                style: 'cancel',
              },
            ],
            { cancelable: true },
          );
          break;
        default:
          break;
      }
    }
  };
  return (
    <SafeAreaView>
      <Card>
        <View>
          <Text style={styles.title}>هدف من</Text>
        </View>
        <ButtonGroup
          onPress={onModePress}
          selectedIndex={mode}
          buttons={modes}
          containerStyle={styles.goals}
          selectedButtonStyle={{ backgroundColor: COLOR.btn }}
          textStyle={styles.text}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={styles.goal}
        />
        <Overlay
          isVisible={visible}
          fullScreen
          overlayStyle={{ justifyContent: 'center' }}>
          <>
            <Card>
              <Text>علت خاموش کردن حالت بارداری:</Text>
              <CheckBox
                center
                title="تولد نوزاد"
                iconRight
                checkedColor="green"
                checked={childBirth}
                onPress={() => {
                  setChildBirth(!childBirth);
                  setAbortion(childBirth);
                }}
              />
              <CheckBox
                center
                title="سقط جنین"
                iconRight
                checkedColor="red"
                checked={abortion}
                onPress={() => {
                  setAbortion(!abortion);
                  setChildBirth(abortion);
                }}
              />
            </Card>
            <Button
              title="تایید"
              onPress={async () => {
                const res = await setPregnancyEnd(
                  abortion,
                  moment().format(FORMAT),
                );
                const p = await PregnancyModule();
                p.determineNefasDays();
                console.log('pregnancy end', res);
                setVisible(false);
              }}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.listItemText}
            />
          </>
        </Overlay>
        <Overlay
          isVisible={stratModal}
          fullScreen
          overlayStyle={{ justifyContent: 'center' }}>
          <>
            <Card>
              <Text>هفته چندم بارداری هستید؟</Text>
              <PregnancyPicker />
            </Card>
            <Button
              title="تایید"
              onPress={async () => {
                const res = await setPregnancyEnd(
                  abortion,
                  moment().format(FORMAT),
                );
                const p = await PregnancyModule();
                p.determineNefasDays();
                console.log('pregnancy end', res);
                setStartModal(false);
              }}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.listItemText}
            />
          </>
        </Overlay>
      </Card>
    </SafeAreaView>
  );
};
export default UserGoal;
