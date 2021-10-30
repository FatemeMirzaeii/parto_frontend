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
  const noteStore = useSelector((state) => state.user.note);

  const _handleDelete = (i) => {
    if (noteStore && Object.keys(noteStore).length > 1) {
      let { [i.key]: omitted, ...res } = noteStore;
      dispatch(setNote(res));
    } else dispatch(setNote([]));
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
