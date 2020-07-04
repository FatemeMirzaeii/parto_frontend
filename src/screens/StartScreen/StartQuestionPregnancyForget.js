import { Button, Icon, Radio, Title, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';

let questionArray = [{ zygosisDate: 1, childbirthDate: 0, lastPeriodDate: 0 }];
const db = new Database();
const { colors, size, fonts } = Theme;

const Startpragnentforget = (props) => {
    const [selected, setSelected] = useState({
        lastPeriodDate: false,
        childbirthDate: false,
        zygosisDate: false,
    });
    useEffect(() => {
        questionArray = props.navigation.state.params.questionArray
        console.log("day: ", questionArray)
    }, [props]);
    const nextPage = async () => {
        if (
            selected.lastPeriodDate == false &&
            selected.childbirthDate == false &&
            selected.zygosisDate == false
        )
            ToastAndroid.show(
                'لطفا یکی از گزینه ها را انتخاب نمایید',
                ToastAndroid.SHORT,
            );
        else {
            questionArray.splice(1, 2)
            if (selected.zygosisDate == true)
                questionArray.push({ zygosisDate: 1, childbirthDate: 0, lastPeriodDate: 0 })
            if (selected.childbirthDate == true)
                questionArray.push({ zygosisDate: 0, childbirthDate: 1, lastPeriodDate: 0 })
            if (selected.lastPeriodDate == true)
                questionArray.push({ zygosisDate: 0, childbirthDate: 0, lastPeriodDate: 1 })

            props.navigation.navigate("pregnancyCalendar", { questionArray })
        }
    };
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#D164A6', '#C2428F', '#780048']}
            style={styles.gradiant}>
            <View style={styles.view}>

                <TouchableOpacity onPress={() => setSelected({ lastPeriodDate: true })}>
                    <View style={styles.view2}>
                        <Radio
                            selected={selected.lastPeriodDate}
                            color="#F700FF"
                            selectedColor="#F93DFF"
                            style={{
                                marginRight: 10,
                            }}
                        />
                        <Text style={styles.txt}>ثبت تاریخ آخرین پریود</Text>
                    </View>
                    <Text style={styles.txt2}>اولین روز عادت ماهانه قبلی ام را میدانم</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelected({ childbirthDate: true })}>
                    <View style={styles.view2}>
                        <Radio
                            selected={selected.childbirthDate}
                            color="#F700FF"
                            selectedColor="#F93DFF"
                            style={{
                                marginRight: 10,
                            }}
                        />
                        <Text style={styles.txt}>ثبت تاریخ زایمان</Text>
                    </View>
                    <Text style={styles.txt2}>پیش بینی تاریخ زایمان را میدانم</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelected({ zygosisDate: true })}>
                    <View style={styles.view2}>
                        <Radio
                            selected={selected.zygosisDate}
                            color="#F700FF"
                            selectedColor="#F93DFF"
                            style={{
                                marginRight: 10,
                            }}
                        />
                        <Text style={styles.txt}>ثبت تاریخ لقاح</Text>
                    </View>
                    <Text style={styles.txt2}>تاریخ لقاح را میدانم</Text>
                </TouchableOpacity>
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
                    onPress={() => nextPage()}>
                    <Title style={[styles.txtbtn, { marginLeft: 20 }]}>بعدی</Title>
                    <Icon name="arrowleft" type="AntDesign" />
                </Button>
            </View>
        </LinearGradient>
    );
};
export default Startpragnentforget;
const styles = StyleSheet.create({
    gradiant: {
        flex: 1,
        justifyContent: 'center',
    },
    view: {
        justifyContent: 'center',
        height: '60%',
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        marginVertical: 10,
        fontFamily: fonts.regular,
        fontSize: size[15],
    },
    txt2: {
        marginTop: -10,
        color: 'gray',
        marginLeft: 30,
        marginVertical: 10,
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
