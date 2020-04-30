import { Container, Text, Content, View } from 'native-base';
import React from 'react';
import { Theme } from '../../app/Theme';
import { AreaChart, Grid, BarChart, StackedBarChart, LineChart, PieChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const contentInset = { top: 20, bottom: 20 }
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const fill = 'rgb(134, 65, 244)'
const data2 = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]
const data3 = [
    {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
        oranges: 400,
    },
    {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
    },
    {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
    },
    {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
    },
]

const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
const keys = ['apples', 'bananas', 'cherries', 'dates']
const Charts = (props) => {
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return (
        <Content >
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid />
            </AreaChart>
            <BarChart style={{ height: 200 }} data={data2} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>
            <StackedBarChart
                style={{ height: 200 }}
                keys={keys}
                colors={colors}
                data={data3}
                showGrid={false}
                contentInset={{ top: 30, bottom: 30 }}
            />
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
            <PieChart style={{ height: 200 }} data={pieData} />
        </Content >
    )
};
export default Charts;

