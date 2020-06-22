import { Button, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WheelPicker } from "react-native-wheel-picker-android";
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';
import { PROFILE } from '../../constants/TableDataBase';
import { storeData } from '../../app/Functions';
const { colors, size, fonts } = Theme;
const db = new Database();

let day = [];
let year = [];
let questionArray = [];
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
        console.log("day: ", questionArray)
    }, [props]);

    const onItemSelected1 = selectedItem => {
        console.log("selected: ", selectedItem + 1)
        setSelected1({ selectedItem });
    };
    const onItemSelected2 = selectedItem => {
        console.log("selected: ", selectedItem + 1)
        setSelected2({ selectedItem });
    };
    const onItemSelected3 = selectedItem => {
        console.log("selected: ", selectedItem + 1340)
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
        console.log("date: ", y + '-' + m + '-' + d)
        let _date = (y + '-' + m + '-' + d).toString()
        questionArray.push({ birthdate: _date })
        console.log("day: ", questionArray)
        saveToLocal()
    }
    const saveToLocal = () => {

        db.rawQuery(
            `INSERT INTO ${PROFILE}
             (pregnant,pregnancy_try,avg_cycle_length,avg_period_length,birthdate,created_at,last_period_date)
             VALUES(${questionArray[0].pregnant},
                ${questionArray[0].pregnancy_try},
                ${questionArray[2].periodDays},
                ${questionArray[3].periodlength},
                ${questionArray[5].birthdate},
                ${questionArray[5].birthdate},
                ${questionArray[1].periodDate})`,
            [],
            PROFILE)
            .then((res) => { goToHome() })
        db.rawQuery(
            `SELECT * FROM ${PROFILE}`, [], PROFILE
        ).then((res) => { console.log('res select: ', res) })

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
                <View style={{ flexDirection: 'row', marginTop: 60, }}>
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
                {/* <View>
                <Text>{`Your selection is ${dataCity[selected]}`}</Text>
            </View> */}
            </View>
            <Button
                rounded
                style={styles.btn}
                onPress={() => nextPress()}>
                <Title style={styles.txtbtn}>بعدی</Title>
            </Button>
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
        // justifyContent: 'center',
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
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#C2428F',
    },
    txtbtn: {
        fontFamily: fonts.regular,
    },
});
