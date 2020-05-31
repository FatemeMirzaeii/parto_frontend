import {Content, Container, View} from 'native-base';
import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Theme, Width} from '../../app/Theme';
import {ScrollView} from 'react-native-gesture-handler';

const {colors, size, fonts} = Theme;

const Charts = (props) => {
  return (
    <Content>
      <ScrollView horizontal={true} style={{height: 400}}>
        <LineChart
          data={{
            labels: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              [1, 2, 2, 2, 5],
            ],
            datasets: [
              {
                data: [
                  37,
                  37.5,
                  38,
                  36,
                  35.5,
                  35,
                  36,
                  38,
                  34.5,
                  39,
                  36.5,
                  33,
                  38,
                  34.5,
                  40,
                  34.5,
                  37.5,
                  39,
                  38,
                  40,
                  36.5,
                  34.5,
                  40,
                  34.5,
                  37.5,
                  39,
                  38,
                  40,
                  36.5,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width * 3}
          height={400}
          // yAxisLabel="z"
          yAxisSuffix="C"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: '#001A69',
            // backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.8,
            backgroundGradientFromOpacity: 0.5,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => 'yellow',
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

            propsForDots: {
              r: '8',
              strokeWidth: '2',
              stroke: 'red',
            },
            // propsForLabels: {
            //     labelColor: 'blue',
            //     stroke: 'blue',

            //     color: 'blue'
            // },
            propsForBackgroundLines: {
              stroke: 'blue',
              strokeWidth: '1',
            },
          }}
          bezier
          style={{
            marginTop: 50,
            marginBottom: 20,
          }}
        />
      </ScrollView>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.medium,
            alignSelf: 'center',
            fontSize: size[12],
          }}>
          نمودار افقی : روزهای دوره{' '}
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            alignSelf: 'center',
            fontSize: size[12],
          }}>
          نمودار عمودی : درجه حرارت (سانتی گراد)
        </Text>
      </View>
    </Content>
    // </LinearGradient>
  );
};
export default Charts;
