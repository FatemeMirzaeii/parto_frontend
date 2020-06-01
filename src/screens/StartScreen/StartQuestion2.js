// import { Content, Container, View, Left, Right, Radio, Body, Button, Title } from 'native-base';
// import React, { useState } from 'react';
// import { StyleSheet, Dimensions, Text, Picker } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { Theme, Width } from '../../app/Theme';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import SmoothPicker from "react-native-smooth-picker";
// const { colors, size, fonts } = Theme

// const Start2 = (props) => {
//     const [selectedValue, setSelectedVlaue] = useState({
//         selected: null,
//         itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
//     });
//     const handleChange = index => {
//         setSelectedVlaue({
//             select: index
//         });
//     };
//     return (
//         <LinearGradient start={{ x: 0, y: 0 }}
//             end={{ x: 0, y: 1 }} colors={['#D164A6', '#C2428F', '#780048']}
//             style={styles.gradiant}>
//             <View style={styles.view}>
//                 <Text style={styles.txt}>آخرین بار ، دوره ماهانه تان</Text>
//                 <Text style={styles.txt}>چه زمانی آغاز شد؟</Text>
//                 <SmoothPicker
//                     initialScrollToIndex={selected}
//                     refFlatList={refPicker}
//                     keyExtractor={(_, index) => index.toString()}
//                     horizontal={true}
//                     scrollAnimation
//                     showsHorizontalScrollIndicator={false}
//                     data={selectedValue.itemList}
//                     renderItem={option => ItemToRender(option, selected, false)}
//                 />

//             </View>
//             <Button rounded style={styles.btn}
//                 onPress={() => props.navigation.navigate('startQuestion2')}
//             ><Title style={styles.txtbtn}></Title></Button>
//         </LinearGradient>
//     )
// };
// export default Start2;
// const styles = StyleSheet.create({
//     gradiant: {
//         flex: 1,
//         justifyContent: 'center'
//     },
//     view: {
//         backgroundColor: 'white',
//         width: '90%',
//         alignSelf: 'center',
//         paddingVertical: 50,
//         borderRadius: 5,
//         paddingHorizontal: 20
//     },
//     view2: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     txt: {
//         fontFamily: fonts.regular,
//         fontSize: size[15]
//     },
//     txt2: {
//         marginTop: -10,
//         color: 'gray',
//         marginLeft: 30,
//         marginVertical: 5,
//         fontFamily: fonts.regular,
//         fontSize: size[14]
//     },
//     btn: {
//         width: '50%',
//         alignSelf: 'center',
//         justifyContent: 'center',
//         marginTop: 30,
//         backgroundColor: '#C2428F'
//     },
//     txtbtn: {
//         fontFamily: fonts.regular
//     }
// });
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SmoothPicker from 'react-native-smooth-picker';

// let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const dataCity = [
    'Paris',
    'Berlin',
    'Lisbonne',
    'Budapest',
    'Londres',
    'Prague',
    'Rome',
    'Barcelone',
    'Amsterdam',
    'Dublin',
    'Vienne',
    'Madrid',
    'Cracovie',
    'Reykjavik',
    'Istambul',
    'Florence',
    'Copenhague',
    'Zagreb',
    'Stockholm',
    'Thessalonique',
    'Marseille',
    'Porto',
    'Lugano',
    'Bruxelles',
    'Lyon',
];

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
            style={[styles.OptionWrapper, { opacity, borderColor: selected ? '#ABC9AF' : 'transparent', width: vertical ? 190 : 'auto' }]}
        >
            <Text style={{ fontSize }}>
                {name}
            </Text>
        </View>
    );
});




const ItemToRender = ({ item, index }, indexSelected, vertical) => {
    const selected = index === indexSelected;
    const gap = Math.abs(index - indexSelected);

    let opacity = opacities[gap];
    if (gap > 3) {
        opacity = opacities[4];
    }
    let fontSize = sizeText[gap];
    if (gap > 1) {
        fontSize = sizeText[2];
    }

    return <Item opacity={opacity} selected={selected} vertical={vertical} fontSize={fontSize} name={item} />;
};

const App = () => {

    function handleChange(index) {
        setSelected(index);
        refPicker.current.scrollToIndex({
            animated: false,
            index: index,
            viewOffset: -30,
        });
    }

    const [selected, setSelected] = useState(4);
    const refPicker = useRef(null);
    return (
        <View style={styles.container}>
            {/* <View style={styles.wrapperHorizontal}>
                <SmoothPicker
                    initialScrollToIndex={selected}
                    refFlatList={refPicker}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal={true}
                    scrollAnimation
                    showsHorizontalScrollIndicator={false}
                    data={dataCity}
                    renderItem={option => ItemToRender(option, selected, false)}
                />
            </View>
            <View style={styles.wrapperVertical}>
                <SmoothPicker
                    initialScrollToIndex={selected}
                    onScrollToIndexFailed={() => { }}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={dataCity}
                    scrollAnimation
                    onSelected={({ item, index }) => handleChange(index)}
                    renderItem={option => ItemToRender(option, selected, true)}
                    magnet
                />
            </View>
            <View>
                <Text>{`Your selection is ${dataCity[selected]}`}</Text>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    wrapperHorizontal: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        color: 'black',
    },
    wrapperVertical: {
        width: 250,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        color: 'black',
    },
    OptionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        borderWidth: 3,
        borderRadius: 10,
    },
});

export default App;