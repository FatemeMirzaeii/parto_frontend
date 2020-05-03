import { Content } from 'native-base';
import React from 'react';
import Svg, { G, Path, Text } from 'react-native-svg'
import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const data = {
    labels: ["سمنان", "تهران", "کرمان"], // optional
    data: [0.4, 0.6, 0.8]
};
const data1 = {
    labels: ["تست", "تست1"],
    legend: ["L1", "L2", "L3"],
    data: [[60, 60, 60], [30, 30, 60]],
    barColors: ["#006499", "#457C99", "#72A7C4"]
};
const chartConfig = {
    backgroundGradientFrom: "#8C72C4",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const data2 = [
    {
        name: "تهران",
        population: 21500000,
        color: "rgba(120, 245, 134, 1)",
        legendFontColor: "#6539C4",
        legendFontSize: 15
    },
    {
        name: "سمنان",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#B839C4",
        legendFontSize: 15
    },
    {
        name: "ایلام",
        population: 527612,
        color: "#D13D6E",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "گرگان",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#395AC4",
        legendFontSize: 15
    },

];
const Charts = (props) => {


    return (
        // <LinearGradient colors={['#A882BD', '#955FB2', '#723991', '#4B2261']} style={styles.linearGradient}>

        <Content >
            <LineChart
                data={{
                    labels: ["جاناوان", "مهر", "آبان", "دی", "فروردین", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#A882BD",
                    backgroundGradientFrom: "#955FB2",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{

                    direction: "ltr",
                    marginVertical: 8,
                    borderRadius: 16
                }}
                direction="rtl"
                dir="rtl"
            />
            <ProgressChart
                data={data}
                width={Dimensions.get("window").width}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
            />
            <StackedBarChart
                height={220}
                // style={graphStyle}
                data={data1}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={chartConfig}
            />
            <PieChart
                data={data2}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </Content >
        // </LinearGradient>
    )
};
export default Charts;

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});