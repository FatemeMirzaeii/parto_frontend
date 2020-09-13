import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';
import styles from './styles';
import CycleModule from '../../util/cycle';
import { COLOR } from '../../styles/static';

const Analysis = ({ navigation }) => {
  const [cycles, setCycles] = useState([]);
  //const [scatterData, setScatterData] = useState();
  useEffect(() => {
    navigation.addListener('focus', async () => {
      initialData();
    });
  }, [navigation]);
  useEffect(() => {
    initialData();
  }, []);
  const initialData = async () => {
    const c = await CycleModule();
    // const s = await c.determineCyclesDetail();
    const f = await c.determineEachCycleDayType();
    setCycles(f);
    // console.log('ssss', s);
  };
  const renderBars = (cycle) => {
    cycle.map((day) => {
      console.log('day', day);
      return (
        <VictoryBar
          key={day.date}
          barWidth={20}
          cornerRadius={{ bottom: 10, top: 10 }}
          // style={{
          //   data: {
          //     fill: ({ datum }) => {
          //       console.log('datum', datum);
          //       return datum.z === 'period' ? COLOR.btn : '#f6f6f6';
          //     },
          //   },
          // }}
          // // labels={({ datum }) => datum.y}
          // // labelComponent={<VictoryLabel dx={-30} />}
          data={[{ x: day.cycleId, y: 1 }]}
        />
      );
    });
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <VictoryChart horizontal>
          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'transparent' },
            }}
          />
          {cycles.map((cycle) => {
            console.log('daaaaaaa', cycle);
            return (
              <VictoryStack
                horizontal
                key={cycle[0].cycleId}
                colorScale={[COLOR.btn, '#f6f6f6']}>
                {cycle.map((day) => {
                  return (
                    <VictoryBar
                      key={day.date}
                      barWidth={20}
                      cornerRadius={{ bottom: 5, top: 5 }}
                      style={{
                        data: {
                          fill: ({ datum }) => {
                            return day.type === 'period'
                              ? COLOR.btn
                              : COLOR.bgColor;
                          },
                        },
                      }}
                      // labels={({ datum }) => datum.y}
                      // labelComponent={<VictoryLabel dx={-30} />}
                      data={[{ x: day.cycleId, y: 1 }]}
                    />
                  );
                })}
              </VictoryStack>
            );
          })}
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Analysis;
