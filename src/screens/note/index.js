import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import jalaali from 'moment-jalaali';
import { useSelector } from 'react-redux';

// components
import SearchBar from '../../components/SearchBar';
import BackButton from '../../components/BackButton';
import NoteListItem from './NoteListItem';
import { e2p, a2p } from '../../util/func';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Note = ({ navigation, route }) => {
  const { day } = route.params;
  const [notes, setNotes] = useState([]);
  const noteStore = useSelector((state) => state.user.note);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: day
        ? `یادداشت‌های ${jalaali(day).format('jDD jMMMM jYYYY')}`
        : 'یادداشت‌ها',
      headerRight: () => <BackButton navigation={navigation} />,
      headerLeft: null,
    });
  });

  useEffect(() => {
    if (noteStore) {
      if (day) {
        setNotes(Object.values(noteStore).filter((item) => item.day === day));
      } else {
        setNotes(Object.values(noteStore));
      }
    }
  }, [day, noteStore]);

  const _handleSearch = (text) => {
    if (text) {
      const result = notes.filter((i) => {
        return (
          i.title.includes(text) ||
          i.title.includes(e2p(text)) ||
          i.title.includes(a2p(text)) ||
          i.note.includes(text) ||
          i.note.includes(e2p(text)) ||
          i.note.includes(a2p(text))
        );
      });
      setNotes(result);
    } else setNotes(Object.values(noteStore));
  };

  const _renderItem = ({ item }) => {
    return <NoteListItem item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        undertxt="جستجو"
        onChangeText={_handleSearch}
        iconColor={COLOR.pink}
      />
      <FlatList
        data={notes}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.txt}>
              یادداشتی
              {day ? ` برای ${jalaali(day).format('jYYYY/jM/jD')} ` : ' '}
              ثبت نشده است.
            </Text>
          );
        }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color={COLOR.white}
        onPress={() =>
          navigation.navigate('NoteEdit', {
            day: day ?? jalaali(),
            note: null,
          })
        }
      />
    </SafeAreaView>
  );
};
export default Note;
