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
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
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

    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
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
          <Text style={styles.dayText}>
            {jalaali(day).format('jYYYY/jM/jD')}
          </Text>
        </View>
        <TextInput
          multiline
          placeholder="یادداشت"
          selectionColor={COLOR.pink}
          style={{
            backgroundColor: '#F3F4F9',
            height: 200,
            fontFamily: FONT.regular,
            fontSize: 14,
          }}
          value={text}
          onChangeText={setText}
        />
      </Card>
      <Button
        title="تغییر تاریخ"
        type="outline"
        onPress={toggle}
        containerStyle={[styles.btnContainer, { width: 100, height: 40 }]}
        buttonStyle={styles.button}
        titleStyle={styles.btnTitle}
        loadingStyle={{ color: COLOR.pink }}
      />
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
            console.log('newDate', j.format('YYYY-MM-DD'));
            setNewDate(j.format('YYYY-MM-DD'));
          }}
          startOfRange={1390}
          endOfRange={1400}
        />
      </DialogBox>
    </SafeAreaView>
  );
};
export default NoteEdit;
