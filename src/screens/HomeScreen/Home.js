import React, { useEffect, useState } from 'react';
import { Agenda, Calendar, CalendarList } from 'react-native-calendars-persianGit';
import { Container, Text, Button, Title, View, Footer, Icon } from 'native-base';
import { StyleSheet, ImageBackground, StatusBar, Image } from 'react-native';
import { Theme, Width } from '../../app/Theme';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const { colors, size, fonts } = Theme
const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' })
const Home = (props) => {
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
        },
        thisDay: "",
        thisMonth: "",
        thisYear: ""

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
    }, [state.thisDay]);
    useEffect
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
        var Persian = jalaali.toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
        var month = checkSwitch(Persian.jm)
        setState({
            thisDay: Persian.jd,
            thisMonth: month,
            thisYear: Persian.jy,
        });

        // MildaiTime = new Date().toISOString().slice(0, 10)

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
        <ImageBackground source={require('../../../assets/images/bg3.png')} style={{ width: '100%', height: '100%', }}>
            <StatusBar translucent barStyle="dark-content" backgroundColor='transparent' />
            {/* <View style={{
                width: 340, height: 325, borderRadius: 300, backgroundColor: 'white',
                position: "absolute", alignSelf: 'center', top: 165, right: 30, opacity: 0.3
            }}></View> */}



            {/* <View style={{ width: '100%', }}> */}
            <ImageBackground source={require('../../../assets/images/moon3.png')}
                style={{ width: Width, height: '100%', alignItems: 'center', alignSelf: 'center' }} >
                <Text style={{ top: 30, fontFamily: fonts.regular, fontSize: size[14], color: '#121C3D', marginTop: 30 }}>{state.thisDay} {state.thisMonth} {state.thisYear}</Text>
                <FlatList
                    horizontal={true}
                    data={weekDay}
                    style={{ alignSelf: 'center', marginTop: 40 }}
                    renderItem={({ item }) => <Text style={{ marginHorizontal: 7, fontFamily: fonts.regular, fontSize: size[12], color: '#121C3D' }}>{item}</Text>}
                />
                <Agenda
                    jalali={jalali.jalaali}
                    style={styles.calendar}
                    current={'2020-05-16'}
                    // minDate={'2020-05-10'}
                    markingType={'multi-period'}
                    firstDay={6}
                    theme={{

                        backgroundColor: 'transparent',
                        calendarBackground: 'transparent',
                        opacity: 0.5,
                        // textSectionTitleColor: '#35036B',
                        todayTextColor: 'white',
                        todayBackgroundColor: 'white',
                        selectedDayTextColor: 'white',
                        monthTextColor: 'white',
                        selectedDayBackgroundColor: '#008F00',
                        elevation: 6,
                        textDisabledColor: '#FF6363',
                        textDayFontFamily: fonts.regular,
                        textMonthFontFamily: fonts.regular,
                        textDayHeaderFontFamily: fonts.regular,
                        'stylesheet.calendar.header': {
                            week: {
                                marginTop: -1,
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
                        '2020-04-27': { endingDay: true, color: 'green', textColor: 'white' },
                        '2020-05-04': { startingDay: true, color: 'green', textColor: 'white' },
                        '2020-05-05': { color: '#2EABFF', textColor: 'white' },
                        '2020-05-06': { endingDay: true, color: '#2EABFF', textColor: 'white' },
                        '2020-05-18': { color: '#2EABFF', textColor: '#802BA8CFFEFF' },
                        '2020-05-30': { color: '#2EABFF', textColor: 'white' },
                        '2020-06-10': { color: 'red', textColor: 'white', borderRadius: 0 },
                        '2020-04-26': { color: '#FF57DD', textColor: 'white' },

                        '2020-05-09': { dots: [vacation, massage, workout], },
                        '2020-05-11': { disabled: true, periods: [{ startingDay: true, endingDay: false, color: 'red' }] },
                        '2020-05-12': { disabled: true, periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                        '2020-05-13': { disabled: true, dots: [massage, workout], periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                        '2020-05-14': { disabled: true, periods: [{ startingDay: false, endingDay: true, color: 'red' }] },
                        '2020-04-30': { dots: [massage] },

                    }}
                />
                <View style={{
                    top: -Width / 1.15, alignItems: 'center'
                }}>
                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.regular }}><Text style={{ color: '#121C3D', fontSize: size[30] }}>19</Text> روز </Text>
                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.regular }}>تا پریود بعدی</Text>
                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.medium, marginTop: 15 }}>21 اردیبهشت</Text>

                </View>
                <Footer style={{ backgroundColor: 'transparent', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: size[60], elevation: 20 }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-between', paddingHorizontal: 40 }}>
                        <TouchableOpacity style={{
                            width: size[40], height: size[40], alignSelf: 'center',
                            justifyContent: 'center',
                        }}><Icon name="calendar" type="AntDesign"
                            onPress={() => props.navigation.navigate("Calendar")}
                            style={{ fontSize: size[30], alignSelf: 'center', color: '#121C3D' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#FCF3CA', borderRadius: 150,
                            width: size[40], height: size[40], alignSelf: 'center',
                            justifyContent: 'center',
                        }}><Icon name="home" type="AntDesign" style={{ fontSize: size[30], alignSelf: 'center', color: '#121C3D' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: size[40], height: size[40], alignSelf: 'center',
                            justifyContent: 'center',
                        }}><Icon name="linechart" type="AntDesign"
                            onPress={() => props.navigation.navigate("Charts")}
                            style={{ fontSize: size[30], alignSelf: 'center', color: '#121C3D' }} />
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity style={{
                    width: size[50], height: size[50], alignSelf: 'center',
                    justifyContent: 'center',
                }}><Icon name="calendar" type="AntDesign"
                    onPress={() => props.navigation.navigate("Calendar")}
                    style={{ fontSize: size[35], alignSelf: 'center', color: '#121C3D' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: 'white', borderRadius: 150,
                    width: size[50], height: size[50], alignSelf: 'center',
                    justifyContent: 'center',
                }}><Icon name="home" type="AntDesign" style={{ fontSize: size[35], alignSelf: 'center', color: '#121C3D' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: size[50], height: size[50], alignSelf: 'center',
                    justifyContent: 'center',
                }}><Icon name="linechart" type="AntDesign"
                    onPress={() => props.navigation.navigate("Charts")}
                    style={{ fontSize: size[35], alignSelf: 'center', color: '#121C3D' }} />
                </TouchableOpacity> */}
                </Footer>
            </ImageBackground>


        </ImageBackground>

    )

};
export default Home;
const styles = StyleSheet.create({
    calendar: {
        // position: 'absolute',
        width: '100%',
        top: -Width / 1.6
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});