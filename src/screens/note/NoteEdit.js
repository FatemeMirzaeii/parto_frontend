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
import { COLOR } from '../../styles/static';
import styles from './styles';
import { DATETIME_FORMAT } from '../../constants/cycle';

const NoteEdit = ({ navigation, route }) => {
  const { date, note } = route.params;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [noteDate, setNoteDate] = useState('');
  const dispatch = useDispatch();
  const noteStore = useSelector((state) => state.user.note);
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
      setContent(note.content);
      setNoteDate(note.date);
    } else setNoteDate(date);
  }, [date, note]);

  const _save = () => {
    dispatch(
      setNote({
        ...noteStore,
        [note ? note.key : noteDate + 'T' + jalaali().format('HH:mm:ss')]: {
          id: note ? note.id : null,
          key: note ? note.key : noteDate + 'T' + jalaali().format('HH:mm:ss'),
          date: jalaali(noteDate).format('YYYY-MM-DD'),
          title: title,
          content: content,
          lastUpdateTime: jalaali().format(DATETIME_FORMAT),
          state: 1, // active
        },
      }),
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredRow}>
        <View style={styles.dateCont}>
          <Text style={styles.dayText}>
            {jalaali(noteDate).format('jYYYY/jM/jD')}
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
        <View style={styles.titleCont}>
          <TextInput
            placeholder="عنوان"
            selectionColor={COLOR.pink}
            style={styles.dayText}
            value={title}
            onChangeText={setTitle}
          />
          <Icon type="entypo" name="new-message" color={COLOR.icon} />
        </View>
        <TextInput
          multiline
          placeholder="متن یادداشت"
          selectionColor={COLOR.pink}
          style={styles.contentCont}
          value={content}
          onChangeText={setContent}
        />
      </Card>

      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        icon={<Icon type="parto" name="calendar" color="#aaa" size={50} />}
        text="ویرایش تاریخ یادداشت"
        firstBtnTitle="تایید"
        firstBtnPress={toggle}>
        <PersianDatePicker
          initialDate={jalaali(noteDate).format('jYYYY-jM-jD')}
          onDateSelected={(d) => {
            const j = jalaali(d, 'jYYYY/jM/jD');
            setNoteDate(j.format('YYYY-MM-DD'));
          }}
          startOfRange={1390}
          endOfRange={1400}
        />
      </DialogBox>
    </SafeAreaView>
  );
};
export default NoteEdit;
