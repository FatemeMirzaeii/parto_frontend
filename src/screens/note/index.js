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
  const { date } = route.params;
  const [notes, setNotes] = useState([]);
  const noteStore = useSelector((state) => state.user.note);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: date
        ? `یادداشت‌های ${jalaali(date).format('jDD jMMMM jYYYY')}`
        : 'یادداشت‌ها',
      headerRight: () => <BackButton navigation={navigation} />,
      headerLeft: null,
    });
  });

  useEffect(() => {
    if (noteStore) {
      if (date) {
        setNotes(
          Object.values(noteStore).filter(
            (item) => item.date === date && item.state === 1,
          ),
        );
      } else {
        setNotes(
          Object.values(noteStore)
            .filter((i) => i.state === 1)
            .sort((a, b) => jalaali(b.date) - jalaali(a.date)),
        );
      }
    }
  }, [date, noteStore]);

  const _handleSearch = (text) => {
    if (text) {
      const result = notes.filter((i) => {
        return (
          i.title.includes(text) ||
          i.title.includes(e2p(text)) ||
          i.title.includes(a2p(text)) ||
          i.content.includes(text) ||
          i.content.includes(e2p(text)) ||
          i.content.includes(a2p(text))
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
        onKeyPress={(nativeEvent) => {
          if (nativeEvent.key === 'Backspace') {
            setNotes(Object.values(noteStore));
          }
        }}
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
              {date ? ` برای ${jalaali(date).format('jYYYY/jM/jD')} ` : ' '}
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
            date: date ?? jalaali().format('YYYY-MM-DD'),
            note: null,
          })
        }
      />
    </SafeAreaView>
  );
};
export default Note;
