import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import jalaali from 'moment-jalaali';

//redux
import { useSelector, useDispatch } from 'react-redux';

//store
import { setNote } from '../../store/actions/user';

// components
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import BackButton from '../../components/BackButton';

// styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const Note = ({ navigation, route }) => {
  const { day } = route.params;
  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.user.note);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادداشت',
      headerRight: () => <BackButton navigation={navigation} />,
      headerLeft: null,
    });
  });

  useEffect(() => {
    const getNotes = () => {
      if (noteState) {
        const temp = [];
        const noteOfDay = Object.keys(noteState).filter(
          (key) => noteState[key].day === day,
          console.log('day'),
        );
        noteOfDay.map((item) => {
          temp.push(noteState[item]);
        });
        setNotes(temp);
        return notes;
      }
    };
    getNotes();
  }, [noteState, day]);

  const _handleDelete = (item) => {
    const keys = Object.keys(noteState).filter(
      (key) => noteState[key].key !== item.key,
    );
    keys.map((ele) => {
      dispatch(
        setNote({
          [noteState[ele].key]: {
            key: noteState[ele].key,
            day: noteState[ele].day,
            title: noteState[ele].title,
            note: noteState[ele].note,
          },
        }),
      );
    });
  };

  const _renderItem = ({ item }) => {
    return (
      <Card>
        {/* <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            // padding: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dayText}>{item.title}</Text>
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
        </View> */}
        {/* <Text
          style={{
            backgroundColor: '#F3F4F9',
            height: 200,
            fontFamily: FONT.regular,
            fontSize: 14,
          }}>
          {item.note}
        </Text> */}
        <PickerListItem
          title={item.title ? item.title : 'عنوان'}
          leftIcon={<Icon type="entypo" name="new-message" color="#aaa" />}
          customComponent={
            <>
              <TextInput
                multiline
                editable={false}
                selectionColor={COLOR.pink}
                style={{
                  // backgroundColor: '#F3F4F9',
                  fontFamily: FONT.regular,
                  fontSize: 14,
                  color: 'black',
                }}
                value={item.note}
                // onChangeText={setMessage}
              />
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  padding: 10,
                  //backgroundColor: 'red',
                }}>
                <Icon
                  containerStyle={{ marginLeft: 10 }}
                  type="parto"
                  name="trash"
                  color={COLOR.icon}
                  onPress={() => _handleDelete(item)}
                />
                <Icon
                  name="new-message"
                  type="entypo"
                  color={COLOR.icon}
                  onPress={() =>
                    navigation.navigate('NoteEdit', {
                      day: day,
                      note: item,
                    })
                  }
                />
                <Icon
                  type="materialicons"
                  name="content-copy"
                  color={COLOR.icon}
                  onPress={() => {
                    Clipboard.setString(item.note);
                    ToastAndroid.show('متن یادداشت کپی شد.', ToastAndroid.LONG);
                  }}
                />
              </View>
            </>
          }
          subtitle={jalaali(day).format('jYYYY/jM/jD')}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes.reverse()}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.txt}>
              یادداشتی برای {jalaali(day).format('jYYYY/jM/jD')} ثبت نشده است.
            </Text>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color={COLOR.white}
        onPress={() =>
          navigation.navigate('NoteEdit', {
            day: day,
            note: null,
          })
        }
      />
    </SafeAreaView>
  );
};
export default Note;
