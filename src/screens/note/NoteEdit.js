import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, TextInput, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import jalaali from 'moment-jalaali';
import { useSelector, useDispatch } from 'react-redux';
import { setNote } from '../../store/actions/user';

// components
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';
import PersianDatePicker from '../../components/PersianDatePicker';
import BackButton from '../../components/BackButton';

//util
import useModal from '../../util/hooks/useModal';

// styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const NoteEdit = ({ navigation, route }) => {
  const { day, note } = route.params;
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.user.note);
  const { isVisible, toggle } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: note === null ? 'یادداشت جدید' : 'ویرایش یادداشت',
      headerRight: () => <BackButton navigation={navigation} />,
      headerLeft: () => (
        <Button
          title="ثبت"
          type="outline"
          onPress={_save}
          containerStyle={[styles.btnContainer, { width: 50, height: 30 }]}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          loadingStyle={{ color: COLOR.pink }}
        />
      ),
    });
  });

  useEffect(() => {
    if (note !== null) {
      setTitle(note.title);
      setText(note.note);
    }
  }, [note]);

  const _save = () => {
    note !== null
      ? dispatch(
          setNote({
            ...noteState,
            [note.key]: {
              key: note.key,
              day: day,
              title: title,
              note: text,
            },
          }),
        )
      : dispatch(
          setNote({
            ...noteState,
            [jalaali().format()]: {
              key: jalaali().format(),
              day: day,
              title: title,
              note: text,
            },
          }),
        );
    // dispatch(setNote({}))
    navigation.goBack();
  };

  const _editDateOfNote = () => {
    note !== null
      ? dispatch(
          setNote({
            ...noteState,
            [note.key]: {
              key: note.key,
              day: newDate,
              title: title,
              note: text,
            },
          }),
        )
      : null;
    // dispatch(
    //     setNote({
    //       ...noteState,
    //       [jalaali().format()]: {
    //         key: jalaali().format(),
    //         day: day,
    //         title: title,
    //         note: text,
    //       },
    //     }),
    //   );
    toggle();
    // navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
        <View
          style={{
            borderRadius: 100,
            height: 40,
            backgroundColor: 'rgba(246, 246, 246, 0.8)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            elevation: 2,
            alignSelf: 'center',
            width: 150,
          }}>
          <Text style={styles.dayText}>
            {jalaali(day).format('jYYYY/jM/jD')}
          </Text>
        </View>
        <Button
          title="تغییر تاریخ"
          onPress={toggle}
          containerStyle={[styles.btnContainer, { width: 100, height: 40 }]}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          loadingStyle={{ color: COLOR.pink }}
        />
      </View>
      <Card hasHeader headerTitle="">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="عنوان"
            selectionColor={COLOR.pink}
            style={styles.dayText}
            value={title}
            onChangeText={setTitle}
          />
          <Icon
            containerStyle={{ marginLeft: 10 }}
            type="entypo"
            name="new-message"
            color={COLOR.icon}
          />
        </View>
        <TextInput
          multiline
          placeholder="متن یادداشت"
          selectionColor={COLOR.pink}
          style={{
            minHeight: 200,
            fontFamily: FONT.regular,
            borderTopWidth: 0.9,
            borderTopColor: COLOR.icon,
            fontSize: 14,
            paddingHorizontal: 10,
          }}
          value={text}
          onChangeText={setText}
        />
      </Card>

      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        icon={<Icon type="parto" name="calendar" color="#aaa" size={50} />}
        text="ویرایش تاریخ یادداشت"
        twoButtons
        firstBtnPress={_editDateOfNote}
        secondBtnPress={toggle}>
        <PersianDatePicker
          onDateSelected={(date) => {
            const j = jalaali(date, 'jYYYY/jM/jD');
            // console.log('newDate', j.format('YYYY-MM-DD'));
            setNewDate(j.format('YYYY-MM-DD'));
          }}
          startOfRange={1390}
          endOfRange={1400}
          initialDate={jalaali(day).format('jYYYY-jM-jD')}
        />
      </DialogBox>
    </SafeAreaView>
  );
};
export default NoteEdit;
