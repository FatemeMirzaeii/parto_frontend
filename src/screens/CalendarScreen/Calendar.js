import React, { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars-persian';
import { Container, Text } from 'native-base';
import { Theme } from '../../app/Theme';
const { colors, size, fonts } = Theme

const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' })
const Calendar = (props) => {
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'green' };
    const workout = { key: 'workout', color: 'yellow' };
    const [state, setState] = useState({
        items: [],
        // markedDates: {
        //     '2020-04-17': { selected: true, marked: true, selectedColor: 'red' },
        //     '2020-04-15': { selected: true, marked: true, dots: [vacation, massage, workout] }
        // }
        markedDates: {

            '2020-04-21': { textColor: 'green' },
            '2020-04-22': { startingDay: true, color: 'green', textColor: 'white' },
            '2020-04-23': { selected: true, color: 'green', textColor: 'white' },
            '2020-04-24': { selected: true, color: 'green', textColor: 'white', endingDay: true },
            // '2020-05-28': { disabled: true, startingDay: true, color: 'green', endingDay: true, textColor: 'white' }
        }

    })
    useEffect(() => {
        GetTimeNow();
    });
    const checkSwitch = (param) => {
        switch (param) {
            case 1:
                return 'فروردین'
            case 2:
                return 'اردیبهشت'
            case 3:
                return 'خرداد'
            case 4:
                return 'تیر'
            case 5:
                return 'مرداد'
            case 6:
                return 'شهریور'
            case 7:
                return 'مهر'
            case 8:
                return 'آبان'
            case 9:
                return 'آذر'
            case 10:
                return 'دی'
            case 11:
                return 'بهمن'
            case 12:
                return 'اسفند'
        }
    }
    const GetTimeNow = async () => {
        var that = this;
        var month1 = new Date().getMonth() + 1;
        var Persian = jalaali.toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
        var month = this.checkSwitch(Persian.jm)
        await that.promisedSetState({
            thisDay: Persian.jd,
            thisMonth: month,
            thisYear: Persian.jy,
        });

        MildaiTime = new Date().toISOString().slice(0, 10)

    }

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 185; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!state.items[strTime]) {
                    state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(state.items).forEach(key => {
                newItems[key] = state.items[key];
            });
            setState({
                items: newItems
            });
        }, 1000);

    }
    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    return (
        <Agenda
            jalali={true}
            firstDay={6}
            markedDates={state.markedDates}
            markingType={'period'}
        // loadItemsForMonth={loadItems()}
        />
    )

};
export default Calendar;
