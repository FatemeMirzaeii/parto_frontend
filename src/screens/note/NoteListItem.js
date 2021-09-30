import React from 'react';
import { View, TextInput, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import jalaali from 'moment-jalaali';
import { useSelector, useDispatch } from 'react-redux';

// components and store
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import { setNote } from '../../store/actions/user';

import { COLOR, FONT } from '../../styles/static';

const NoteListItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.user.note);

  const _handleDelete = (i) => {
    //todo: should review delete code
    const keys = Object.keys(noteState).filter(
      (key) => noteState[key].key !== i.key,
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
  return (
    <Card>
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
                    day: item.day,
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
        subtitle={jalaali(item.day).format('jYYYY/jM/jD')}
      />
    </Card>
  );
};
export default NoteListItem;
