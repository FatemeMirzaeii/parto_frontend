import { Button, Title, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WheelPicker } from "react-native-wheel-picker-android";
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';
import { PROFILE } from '../../constants/TableDataBase';
import { storeData } from '../../app/Functions';
const moment = require('moment');

const { size, fonts } = Theme;
const db = new Database();

let day = [];
let year = [];
let questionArray = [];
let forgetPragnancy = false
let month = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];
let data = []
const dataSet = () => {
    for (let j = 1340; j <= 1386; j++) year.push(toPersianNum(j));
    for (let i = 1; i <= 31; i++) day.push(toPersianNum(i));
}
dataSet()
const Start5 = (props) => {
    const [selected1, setSelected1] = useState({
        selectedItem: 0,
    })
    const [selected2, setSelected2] = useState({
        selectedItem: 0,
    })
    const [selected3, setSelected3] = useState({
        selectedItem: 0,
    })

    useEffect(() => {
        questionArray = props.navigation.state.params.questionArray
        forgetPragnancy = props.navigation.state.params.forgetPragnancy
        console.log("day: ", questionArray)
    }, [props]);

    const onItemSelected1 = selectedItem => {
        setSelected1({ selectedItem });
    };
    const onItemSelected2 = selectedItem => {
        setSelected2({ selectedItem });
    };
    const onItemSelected3 = selectedItem => {
        setSelected3({ selectedItem });
    };

    const nextPress = () => {
        let d, m, y = "";
        if (selected1.selectedItem < 9) {
            d = "0" + (selected1.selectedItem + 1)
        }
        else {
            d = selected1.selectedItem + 1
        }
        if (selected2.selectedItem < 9) {
            m = "0" + (selected2.selectedItem + 1)
        }
        else {
            m = selected2.selectedItem + 1
        }

        y = selected3.selectedItem + 1340
        let _date = (y + m + d).toString()
        questionArray.push({ birthdate: _date })
        console.log("day: ", questionArray)
        saveToLocal()
    }
    const saveToLocal = () => {
        const today = moment()
        if (forgetPragnancy == true) {
            console.log('pragnancy ok')
            goToHome()
        } else {
            db.rawQuery(
                `INSERT INTO ${PROFILE}
             (pregnant,pregnancy_try,avg_cycle_length,avg_period_length,birthdate,created_at,last_period_date)
             VALUES(${questionArray[0].pregnant},
                ${questionArray[0].pregnancy_try},
                ${questionArray[2].periodDays},
                ${questionArray[3].periodlength},
                ${(questionArray[5].birthdate).toString()},
                ${today.format('YYYYMMDD')},
                ${questionArray[1].periodDate})`,
                [],
                PROFILE)
                .then((res) => { goToHome() })

        }
    }
    const goToHome = async () => {
        await storeData('@startPages', 'true')
        props.navigation.navigate("Home")
    }
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#D164A6', '#C2428F', '#780048']}
            style={styles.gradiant}>
            <View style={styles.view}>
                <Text style={styles.txt}>تاریخ تولد شما، چیست ؟</Text>
                <View style={{ flexDirection: 'row', marginTop: 60, alignSelf: 'center' }}>
                    <View style={styles.wrapperVertical}>
                        <WheelPicker
                            style={{ width: 110, height: 200 }}
                            isCyclic={true}
                            selectedItemTextFontFamily={fonts.regular}
                            selectedItemTextSize={20}
                            itemTextFontFamily={fonts.regular}
                            selectedItem={selected1.selectedItem}
                            data={day}
                            onItemSelected={onItemSelected1}
                        />
                    </View>
                    <View style={styles.wrapperVertical}>
                        <WheelPicker
                            style={{ width: 110, height: 200 }}
                            isCyclic={true}
                            selectedItemTextFontFamily={fonts.regular}
                            selectedItemTextSize={20}
                            itemTextFontFamily={fonts.regular}
                            selectedItem={selected1.selectedItem}
                            data={month}
                            onItemSelected={onItemSelected2}
                        />
                    </View>
                    <View style={styles.wrapperVertical}>
                        <WheelPicker
                            style={{ width: 110, height: 200 }}
                            isCyclic={true}
                            selectedItemTextFontFamily={fonts.regular}
                            selectedItemTextSize={20}
                            itemTextFontFamily={fonts.regular}
                            selectedItem={selected3.selectedItem}
                            data={year}
                            onItemSelected={onItemSelected3}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    rounded
                    style={styles.btn}
                    onPress={() => props.navigation.goBack()}>
                    <Icon name="arrowright" type="AntDesign" />
                    <Title style={[styles.txtbtn, { marginRight: 20 }]}>قبلی</Title>
                </Button>
                <Button
                    rounded
                    style={styles.btn}
                    onPress={() => nextPress()}>
                    <Title style={[styles.txtbtn, { marginLeft: 20 }]}>بعدی</Title>
                    <Icon name="arrowleft" type="AntDesign" />

                </Button>

            </View>
        </LinearGradient>
    );
};

export default Start5;

const styles = StyleSheet.create({
    gradiant: {
        flex: 1,
        justifyContent: 'center',
    },
    view: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        height: '60%',
        paddingTop: 20,
        borderRadius: 5,
        paddingHorizontal: 20,
    },

    wrapperVertical: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        color: 'black',
    },
    OptionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontFamily: fonts.regular,
        fontSize: size[15],
    },
    txt2: {
        marginTop: -10,
        color: 'gray',
        marginLeft: 30,
        marginVertical: 5,
        fontFamily: fonts.regular,
        fontSize: size[14],
    },
    btn: {
        marginHorizontal: 20,
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#C2428F',
    },
    txtbtn: {
        alignSelf: 'center',
        fontFamily: fonts.regular,
    },
});
