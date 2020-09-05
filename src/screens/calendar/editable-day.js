import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import jalaali from 'moment-jalaali';
import Ptxt from '../../components/Ptxt';
import { COLOR } from '../../styles/static';
import styles from './styles';
const EditableDay = useMemo(
  ({ date, state, marking, onPress, onLongPress }) => {
    return (
      <TouchableOpacity
        onPress={state === 'disabled' ? null : () => onPress(date)}
        onLongPress={state === 'disabled' ? null : () => onLongPress(date)}>
        <Ptxt
          style={[
            styles.editableDays,
            {
              color:
                state === 'disabled' ? COLOR.textColor : COLOR.textColorDark,
              backgroundColor:
                state === 'today'
                  ? COLOR.currentPage
                  : marking.length !== 0
                  ? marking.periods[0].color
                  : 'white',
            },
          ]}>
          {jalaali(date.dateString).format('jD')}
        </Ptxt>
      </TouchableOpacity>
    );
  },
);
export default EditableDay;
