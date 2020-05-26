import { Footer, Icon, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars-persian';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { toPersianNum } from '../../app/Functions';
import { Theme, Width, Height } from '../../app/Theme';

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
        <ImageBackground source={require('../../../assets/images/bg7.png')} style={{ width: '100%', height: '100%', }}>
            <StatusBar translucent barStyle="dark-content" backgroundColor='transparent' />
            <ImageBackground source={require('../../../assets/images/moon7.png')} style={{ width: '100%', height: '100%', top: 30 }}>

                <Text style={{ fontFamily: fonts.regular, fontSize: size[14], color: '#121C3D', marginTop: Height / 14, alignSelf: 'center' }}>
                    {toPersianNum(state.thisDay)}
                    {" "}
                    {state.thisMonth}
                    {" "}
                    {toPersianNum(state.thisYear)}
                </Text>
                <FlatList
                    horizontal={true}
                    data={weekDay}
                    style={{ alignSelf: 'center', marginTop: 10 }}
                    renderItem={({ item }) => <Text style={{
                        marginHorizontal: 8,
                        fontFamily: fonts.regular,
                        fontSize: size[12], height: size[50],
                        color: '#121C3D'
                    }}>{item}</Text>}
                />

                <Agenda
                    jalali={jalali.jalaali}
                    style={styles.calendar}
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
                        selectedDayBackgroundColor: 'pink',
                        elevation: 6,
                        textDisabledColor: '#FF4040',
                        // FF4040   //1DD159
                        textDayFontFamily: fonts.regular,
                        textMonthFontFamily: fonts.regular,
                        textDayHeaderFontFamily: fonts.regular,
                        'stylesheet.calendar.header': {
                            week: {
                                marginTop: -7,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }
                        }
                    }}
                    markedDates={{
                        // '2020-05-22': { dots: [vacation, massage, workout], },
                        '2020-05-20': { disabled: true, periods: [{ startingDay: true, endingDay: false, color: 'red' }] },
                        '2020-05-19': { disabled: true, periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                        '2020-05-20': { disabled: true, dots: [massage, workout], periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                        '2020-05-21': { disabled: true, periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                        '2020-05-22': { disabled: true, selected: true, periods: [{ startingDay: false, endingDay: true, color: 'red' }] },
                        '2020-05-30': { disabled: true, },
                        '2020-05-31': { disabled: true, },
                        '2020-06-01': { disabled: true, },
                        '2020-06-02': { disabled: true, },
                        '2020-06-03': { disabled: true, },
                        '2020-06-21': { disabled: true, selected: true },
                        '2020-06-22': { disabled: true, selected: true },
                        '2020-06-23': { disabled: true, periods: [{ startingDay: true, endingDay: false, color: 'red' }] },
                        '2020-06-24': { disabled: true, periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
                    }}
                >

                </Agenda>
                <View style={{
                    width: '100%',
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    marginTop: Height / 5.5
                }}>

                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.regular }}>
                        <Text style={{ color: '#121C3D', fontSize: size[30], fontFamily: fonts.regular }}>
                            {toPersianNum(2)}</Text> روز </Text>
                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.regular }}>
                        {/* دوره پریود */}
                        تا پریود بعدی
        </Text>
                    <Text style={{ color: '#121C3D', fontSize: size[24], fontFamily: fonts.medium, marginTop: 10 }}>
                        {toPersianNum(27)} خرداد</Text>
                    <Text style={{ color: '#7A0000', fontSize: size[15], fontFamily: fonts.regular }}>
                        {/* احتمال بالای باروری  */}
                    </Text>
                </View>
                <Footer style={{ position: 'absolute', backgroundColor: 'green', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: size[60], elevation: 20 }}>
                    {/* <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-between', paddingHorizontal: 40 }}>
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
                    </View> */}
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
        marginTop: -Height * 0.9,
        height: 50
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});
