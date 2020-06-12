import { Button, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPicker from 'react-native-smooth-picker';
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';

const { colors, size, fonts } = Theme;
let day = [];
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
let year = [];

const opacities = {
    0: 1,
    1: 1,
    2: 0.6,
    3: 0.3,
    4: 0.1,
};
const sizeText = {
    0: 20,
    1: 15,
    2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
    return (
        <View
            style={[
                styles.OptionWrapper,
                { opacity, borderColor: selected ? 'gray' : 'transparent', width: 100 },
            ]}>
            <Text style={{ fontSize, fontFamily: fonts.regular }}>{name}</Text>
        </View>
    );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
    const selected = index === indexSelected;
    const gap = Math.abs(index - indexSelected);

    let opacity = opacities[gap];
    if (gap > 3) {
        opacity = opacities[2];
    }
    let fontSize = sizeText[gap];
    if (gap > 1) {
        fontSize = sizeText[2];
    }

    return (
        <Item
            opacity={opacity}
            selected={selected}
            vertical={vertical}
            fontSize={fontSize}
            name={item}
        />
    );
};

const Start5 = (props) => {
    useEffect(() => {
        for (let j = 1340; j <= 1399; j++) year.push(toPersianNum(j));
        for (let i = 1; i <= 30; i++) day.push(toPersianNum(i));
    });
    function handleChangeday(index) {
        setSelectedday(index);
    }
    function handleChangemonth(index) {
        setSelectedmonth(index);
    }
    function handleChangeyear(index) {
        setSelectedyear(index);
    }

    const [selectedday, setSelectedday] = useState(4);
    const [selectedmonth, setSelectedmonth] = useState(4);
    const [selectedyear, setSelectedyear] = useState(4);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#D164A6', '#C2428F', '#780048']}
            style={styles.gradiant}>
            <View style={styles.view}>
                <Text style={styles.txt}>تاریخ تولد شما، چیست ؟</Text>
                <View style={{ flexDirection: 'row', marginTop: 60 }}>
                    <View style={styles.wrapperVertical}>
                        <SmoothPicker
                            initialScrollToIndex={selectedday}
                            onScrollToIndexFailed={() => { }}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            data={day}
                            scrollAnimation
                            onSelected={({ item, index }) => handleChangeday(index)}
                            renderItem={(option) => ItemToRender(option, selectedday, true)}
                            magnet
                        />
                    </View>
                    <View style={[styles.wrapperVertical, { marginTop: -0.5 }]}>
                        <SmoothPicker
                            initialScrollToIndex={selectedmonth}
                            onScrollToIndexFailed={() => { }}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            data={month}
                            scrollAnimation
                            onSelected={({ item, index }) => handleChangemonth(index)}
                            renderItem={(option) => ItemToRender(option, selectedmonth, true)}
                            magnet
                        />
                    </View>
                    <View style={styles.wrapperVertical}>
                        <SmoothPicker
                            initialScrollToIndex={selectedyear}
                            onScrollToIndexFailed={() => { }}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            data={year}
                            scrollAnimation
                            onSelected={({ item, index }) => handleChangeyear(index)}
                            renderItem={(option) => ItemToRender(option, selectedyear, true)}
                            magnet
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
                onPress={() => props.navigation.navigate('StartQuestion3')}>
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
