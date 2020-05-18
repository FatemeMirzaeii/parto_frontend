import { Content, Container, View } from 'native-base';
import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Theme, Width } from '../../app/Theme';
import { ScrollView } from 'react-native-gesture-handler';

const { colors, size, fonts } = Theme

const Charts = (props) => {


    return (
        <Content >
            <ScrollView horizontal={true} style={{ height: 300 }}>
                <LineChart
                    data={{
                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, "...", 18, 19, "...", 27, 28],
                        datasets: [
                            {
                                data: [37, 39, 36.5, 33, 38, 34.5, 40, 34.5, 37.5, 39, 38, 40, 36.5]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width * 2} // from react-native
                    height={300}
                    // yAxisLabel="z"
                    yAxisSuffix="C"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundGradientFrom: "#1E2923",
                        backgroundGradientTo: "#08130D",
                        backgroundGradientToOpacity: 0.5,
                        backgroundGradientFromOpacity: 0.5,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => 'green',
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                        propsForDots: {
                            r: "10",
                            strokeWidth: "2",
                            stroke: 'red'
                        },
                        // propsForLabels: {
                        //     labelColor: 'blue',
                        //     stroke: 'blue',

                        //     color: 'blue'
                        // },
                        propsForBackgroundLines: {
                            stroke: 'red',
                            strokeWidth: "1",
                        }
                    }}
                    bezier
                    style={{

                        marginVertical: 8,
                        borderRadius: 10
                    }}

                />
            </ScrollView>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                <Text style={{ fontFamily: fonts.medium, alignSelf: 'center', fontSize: size[12] }}>نمودار افقی : روزهای دوره  -</Text>
                <Text style={{ fontFamily: fonts.medium, alignSelf: 'center', fontSize: size[12] }}>نمودار عمودی : درجه حرارت (سانتی گراد)</Text>


            </View>

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