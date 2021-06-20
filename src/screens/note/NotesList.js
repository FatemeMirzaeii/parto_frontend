import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ToastAndroid } from 'react-native';
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
import SearchBar from '../../components/SearchBar';

//util
import { e2p, a2p } from '../../util/func';

// styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const NotesList = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const noteState = useSelector((state) => state.user.note);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادداشت‌ها',
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
      headerLeft: () =>
        // <SearchBar
        //   undertxt="جستجو"
        //   onChangeText={_handleSearch}
        //   iconColor={COLOR.pink}
        // />
        null,
    });
  });

  useEffect(() => {
    if (noteState) setNotes(Object.values(noteState));
  }, [noteState]);

  // useEffect(() => {
  //   const result = notes.filter((i) => {
  //     return (
  //       i.title.includes(searchInput) ||
  //       i.title.includes(e2p(searchInput)) ||
  //       i.title.includes(a2p(searchInput)) ||
  //       i.note.includes(searchInput) ||
  //       i.note.includes(e2p(searchInput)) ||
  //       i.note.includes(a2p(searchInput))
  //     );
  //   });
  //   setNotes(result);
  // }, [searchInput]);

  const _handleSearch = (text) => {
    // setData(article);

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
      console.log('result', result);
    } else setNotes(Object.values(noteState));
  };

  const _handleDelete = (item) => {
    const keys = Object.keys(noteState).filter(
      (key) => noteState[key].key !== item.key,
    );
    if (keys.length > 0)
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
    else dispatch(setNote([]));
  };

  const _renderItem = ({ item }) => {
    return (
      <Card>
        <View
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
            {jalaali(item.day).format('jYYYY/jM/jD')}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: '#F3F4F9',
            height: 200,
            fontFamily: FONT.regular,
            fontSize: 14,
          }}>
          {item.note}
        </Text>
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
            type="materialicons"
            name="content-copy"
            color={COLOR.icon}
            onPress={() => {
              Clipboard.setString(item.note);
              ToastAndroid.show('متن یادداشت کپی شد.', ToastAndroid.LONG);
            }}
          />
          <Icon
            name="new-message"
            type="entypo"
            color={COLOR.icon}
            onPress={() =>
              navigation.navigate('NoteEdit', {
                day: item.day,
                note: item,
              })
            }
          />
        </View>
      </Card>
    );
  };

  console.log('noteState', Object.values(noteState));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        undertxt="جستجو"
        onChangeText={_handleSearch}
        // onChangeText={(text)=>{setSearchInput(text)}}
        iconColor={COLOR.pink}
      />
      <FlatList
        data={notes}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return <Text style={styles.txt}>هنوز یادداشتی ثبت نکرده‌اید.</Text>;
        }}
        showsVerticalScrollIndicator={false}
      />
      {/* <FAB
        style={styles.fab}
        icon="plus"
        color={COLOR.white}
        // onPress={() =>
        //   navigation.navigate('NoteEdit', {
        //     day: day,
        //     note: null,
        //   })
        // }
      /> */}
    </SafeAreaView>
  );
};
export default NotesList;
