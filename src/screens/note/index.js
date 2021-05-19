import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, View, TextInput, Text, FlatList } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setNote } from '../../store/actions/user';
import jalaali from 'moment-jalaali';

// components
import Card from '../../components/Card';

// styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const Note = ({ navigation, route }) => {
  const { day } = route.params;
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [arrNote, setArrNote] = useState('');
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.user.note);
  const index = Object.keys(noteState).length;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادداشت',
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
    const noteOfDay = Object.keys(noteState).filter(
      (key) => noteState[key] && noteState[key].day === day,
    );
    setArrNote(noteOfDay);
    console.log('day.noteOfDay*********', noteOfDay);
  }, [setArrNote, day, noteState]);

  const _save = () => {
    dispatch(
      setNote({
        ...noteState,
        [index]: {
          id: index,
          day: day,
          title: title,
          note: text,
        },
      }),
    );
    navigation.pop();
    // dispatch(
    //   setNote({

    //   }),
    // );
  };

  const _renderItems = (item) => {
    return (
      <Card>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dayText}>{noteState[item].title}</Text>
            {/* <TextInput
              placeholder="عنوان"
              selectionColor={COLOR.pink}
              style={styles.dayText}
              value={noteState[item].title}
              // onChangeText={setTitle}
            /> */}
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
        {/* <TextInput
          multiline
          placeholder="یادداشت"
          selectionColor={COLOR.pink}
          style={{
            backgroundColor: '#F3F4F9',
            height: 200,
            fontFamily: FONT.regular,
            fontSize: 14,
          }}
          value={noteState[item].note}
          //onChangeText={setText}
        /> */}
        <Text style={styles.dayText}>{noteState[item].note}</Text>
      </Card>
    );
  };
  console.log('noteState', noteState);
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
            {/* <Text style={styles.dayText}>عنوان</Text> */}
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
      {/* {noteState && arrNote && (
        // <FlatList
        //   data={arrNote}
        //   renderItem={_renderItems}
        //   keyExtractor={(item, index) => index.toString()}
        // />
        <Text>yessssssssss</Text>
      )} */}
    </SafeAreaView>
  );
};
export default Note;
