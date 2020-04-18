import React from 'react';
import { Agenda } from 'react-native-calendars-persian';
import { Container, Text } from 'native-base';
import { Theme } from '../../app/Theme';
const { colors, size, fonts } = Theme


const Calendar = (props) => {
    return (
        <Agenda
            jalali={true}
            firstDay={6}
        />
    )
};
export default Calendar;
