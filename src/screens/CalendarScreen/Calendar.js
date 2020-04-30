import React, { useEffect, useState } from 'react';
import { Agenda, Calendar, CalendarList } from 'react-native-calendars-persian';
import { Container, Text, Button, Title, View, Footer } from 'native-base';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Theme } from '../../app/Theme';
import { FlatList } from 'react-native-gesture-handler';
const { colors, size, fonts } = Theme
const testIDs = require('./testIDs');
const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' })
const CalendarClass = (props) => {
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'green' };
    const massage = { key: 'massage', color: '#15E307', selectedDotColor: 'green' };
    const workout = { key: 'workout', color: 'yellow' };
    const [jalali, setjalali] = useState({ jalaali: true, text: 'میلادی' })
    const [state, setState] = useState({
        items: [],
        markedDates: {
            '2020-03-28': {
                startingDay: true,
                customStyles: {
                    container: {
                        // backgroundColor: 'green',
                        top: 10,
                        startingDay: true,
                    },
                    text: {
                        color: 'red',
                        fontWeight: 'bold',
                        marginTop: -5,
                    },
                },
            },
            '2020-03-29': {
                customStyles: {
                    container: {
                        backgroundColor: 'pink',
                        elevation: 2,
                        top: 10

                    },
                    text: {
                        marginTop: -5,
                        color: 'white'
                    },
                }
            }
        }

    })
    const [weekDay, setweekDay] = useState(["شنبه"
        , "یک‌شنبه"
        , "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه"
        , "جمعه"])
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
    // onDayPress = (day) => {
    //     this.setState({ selected: day.dateString });
    // }
    return (
        <ImageBackground source={require('../../../assets/images/bg1.jpg')} style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#9C47C9', opacity: 0.3, position: "absolute" }} />
            <StatusBar translucent barStyle="light-content" backgroundColor='transparent' />
            <View style={{
                width: 340, height: 325, borderRadius: 300, backgroundColor: 'white',
                position: "absolute", alignSelf: 'center', top: 165, right: 30, opacity: 0.3
            }}></View>
            <Text style={{ top: 30, fontFamily: fonts.regular, fontSize: size[14], color: 'white', alignSelf: 'center', marginTop: 10 }}>10 اردیبهشت 1399</Text>
            <FlatList
                horizontal={true}
                data={weekDay}
                style={{ top: 70, position: 'absolute', alignSelf: 'center', marginVertical: 10, }}
                renderItem={({ item }) => <Text style={{ marginHorizontal: 7, fontFamily: fonts.regular, fontSize: size[12], color: 'white' }}>{item}</Text>}
            />

            <Agenda
                jalali={jalali.jalaali}
                style={styles.calendar}
                current={'2020-05-16'}
                // minDate={'2020-05-10'}
                markingType={'multi-dot'}
                firstDay={6}
                theme={{

                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    opacity: 0.5,
                    textSectionTitleColor: '#35036B',
                    todayTextColor: 'white',
                    todayBackgroundColor: 'white',
                    selectedDayTextColor: 'white',
                    monthTextColor: 'white',
                    selectedDayBackgroundColor: 'pink',
                    elevation: 6,
                    textDisabledColor: 'red',
                    textDayFontFamily: fonts.regular,
                    textMonthFontFamily: fonts.regular,
                    textDayHeaderFontFamily: fonts.regular,
                    'stylesheet.calendar.header': {
                        week: {
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }
                    }
                }}
                markedDates={{
                    '2020-05-17': { disabled: true },
                    '2020-04-21': { textColor: '#009933' },
                    '2020-05-09': { textColor: '#009933' },
                    '2020-05-14': { startingDay: true, color: 'green', endingDay: true, textColor: 'white' },
                    '2020-05-21': { startingDay: true, color: '#FF57DD', textColor: 'white' },
                    '2020-05-22': { endingDay: true, color: '#FF57DD', textColor: 'white' },
                    '2020-05-24': { startingDay: true, color: '#FF57DD' },
                    '2020-05-25': { color: '#FF57DD' },
                    '2020-05-26': { endingDay: true, color: '#FF57DD' },
                    '2020-04-25': { startingDay: true, color: '#FF57DD', textColor: 'white' },
                    '2020-04-26': { color: '#FF57DD', textColor: 'white' },
                    '2020-04-27': { endingDay: true, color: '#2EABFF', textColor: 'white' },
                    '2020-05-04': { startingDay: true, color: 'green', textColor: 'white' },
                    '2020-05-05': { color: '#2EABFF', textColor: 'white' },
                    '2020-05-06': { endingDay: true, color: '#2EABFF', textColor: 'white' },
                    '2020-05-18': { color: '#2EABFF', textColor: '#802BA8CFFEFF' },
                    '2020-05-30': { color: '#2EABFF', textColor: 'white' },
                    '2020-06-10': { color: 'red', textColor: 'white', borderRadius: 0 },
                    '2020-04-26': { color: '#FF57DD', textColor: 'white' },

                    '2020-04-25': { disabled: true, dotColor: 'green', dots: [vacation, massage, workout] },
                    '2020-04-26': { disabled: true },
                    '2020-04-27': { disabled: true, dots: [massage, workout] },
                    '2020-04-29': {},
                    '2020-04-30': { dots: [massage] },

                }}
            />
            <Footer style={{ backgroundColor: 'transparent', borderTopEndRadius: 30, borderTopStartRadius: 30, height: 60 }}>
                <View
                    style={{
                        width: '100%', height: '100%', backgroundColor: 'white',
                        borderTopEndRadius: 30, borderTopStartRadius: 30, opacity: 0.9
                    }}
                ></View>
            </Footer>
        </ImageBackground>

    )

};
export default CalendarClass;
const styles = StyleSheet.create({
    calendar: {
        width: '100%',
        top: 60,
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});