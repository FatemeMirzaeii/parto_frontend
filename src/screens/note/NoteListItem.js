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

import { COLOR } from '../../styles/static';
import { DATETIME_FORMAT } from '../../constants/cycle';
import styles from './styles';

const NoteListItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const noteStore = useSelector((state) => state.user.note);

  const _handleDelete = (i) => {
    // let { [i.key]: omitted, ...res } = noteStore; a good way to remove item from object immutable
    dispatch(
      setNote({
        ...noteStore,
        [i.key]: {
          id: i.id,
          key: i.key,
          date: i.date,
          title: i.title,
          content: i.content,
          lastUpdateTime: jalaali().format(DATETIME_FORMAT),
          state: 2, //deleted
        },
      }),
    );
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
              style={styles.content}
              value={item.content}
            />
            <View style={styles.row}>
              <Icon
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
                    date: item.date,
                    note: item,
                  })
                }
              />
              <Icon
                type="materialicons"
                name="content-copy"
                color={COLOR.icon}
                onPress={() => {
                  Clipboard.setString(item.content);
                  ToastAndroid.show('متن یادداشت کپی شد.', ToastAndroid.LONG);
                }}
              />
            </View>
          </>
        }
        subtitle={jalaali(item.date).format('jYYYY/jM/jD')}
      />
    </Card>
  );
};
export default NoteListItem;
