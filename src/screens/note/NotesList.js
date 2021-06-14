import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
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

// styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const NotesList = ({ navigation, route }) => {
  // const { day } = route.params;
  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.user.note);
  const keys = Object.keys(noteState);
  const n=keys.map((ele)=>[{
        [noteState[ele].key]: {
          key: noteState[ele].key,
          day: noteState[ele].day,
          title: noteState[ele].title,
          note: noteState[ele].note,
        },
      }])

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
      headerLeft: null,
    });
  });

  const getData = useCallback(() => {
    const keys = Object.keys(noteState);
    const t = [];
    // keys.map((ele) => {
    //   setNotes({
    //     [noteState[ele].key]: {
    //       key: noteState[ele].key,
    //       day: noteState[ele].day,
    //       title: noteState[ele].title,
    //       note: noteState[ele].note,
    //     },
    //   });
    // });
    keys.map((ele) => {
        t.push({
          [noteState[ele].key]: {
            key: noteState[ele].key,
            day: noteState[ele].day,
            title: noteState[ele].title,
            note: noteState[ele].note,
          },
        });
      });
      setNotes(t)
  }, []);
  useEffect(() => {
    // const getData = () => {
    //   // const keys = Object.keys(noteState);
    //   // keys.map((ele) => {
    //   //   setNotes({
    //   //     [noteState[ele].key]: {
    //   //       key: noteState[ele].key,
    //   //       day: noteState[ele].day,
    //   //       title: noteState[ele].title,
    //   //       note: noteState[ele].note,
    //   //     },
    //   //   });
    //   // });

    // };
    // getData;
    // const entries = Object.entries(noteState);

    //console.log('entries############', entries);

    // if (noteState) {
    //   const keys = Object.keys(noteState);
    //   const t = [];
    // keys.map((ele) => {
    //   t.push({
    //     [noteState[ele].key]: {
    //       key: noteState[ele].key,
    //       day: noteState[ele].day,
    //       title: noteState[ele].title,
    //       note: noteState[ele].note,
    //     },
    //   });
    // });
    // for(let i=0;i<keys.length;i++)
    // {
    //       t.push({
    //     [noteState[i].key]: {
    //       key: noteState[i].key,
    //       day: noteState[i].day,
    //       title: noteState[i].title,
    //       note: noteState[i].note,
    //     },
    //   });
    // }
    // setNotes(t);
    // }
    if (noteState) {
      getData;
    }
  }, [notes,getData,noteState]);

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

  // console.log('+++++++', Object.keys(noteState));
 
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

 console.log('_getData() **', notes);
  console.log('+++++++', noteState);
  console.log('==================', n);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <FlatList
        data={getData}
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
        onPress={() =>
          navigation.navigate('NoteEdit', {
            day: day,
            note: null,
          })
        }
      /> */}
    </SafeAreaView>
  );
};
export default NotesList;
