import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import jalaali from 'moment-jalaali';
import { useSelector } from 'react-redux';

// components
import BackButton from '../../components/BackButton';
import NoteListItem from './NoteListItem';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Note = ({ navigation, route }) => {
  const { day } = route.params;
  const [notes, setNotes] = useState([]);
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

  const _renderItem = ({ item }) => {
    return <NoteListItem item={item} navigation={navigation} />;
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
