import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import styles from './styles';
import CycleModule from '../../util/cycle';
import { COLOR, FONT, WIDTH } from '../../styles/static';
import Ptext from '../../components/Ptxt';

const Analysis = ({ navigation }) => {
  const [cycles, setCycles] = useState([]);
  const [avg, setAvg] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      initialData();
      setAvg(
        Math.round(
          cycles.reduce((a, b) => parseInt(a) + b.length, 0) / cycles.length,
        ),
      );
    });
  }, [cycles, navigation]);
  useEffect(() => {
    initialData();
    setAvg(
      Math.round(
        cycles.reduce((a, b) => parseInt(a) + b.length, 0) / cycles.length,
      ),
    );
  }, [cycles]);
  const initialData = async () => {
    const c = await CycleModule();
    const d = await c.determineEachCycleDayType();
    setCycles(d);
  };
  const renderBars = (cycle) => {
    return cycle.map((day, i) => {
      return (
        <VictoryBar
          key={i}
          barWidth={10}
          cornerRadius={{
            top: ({ datum }) => datum.y * 5,
          }}
          style={{
            data: {
              fill: ({ datum }) => {
                return day.type === 'period' ? COLOR.btn : COLOR.bgColor;
              },
              strokeWidth: 5,
            },
          }}
          data={[{ x: day.cycleId, y: 1 }]}
        />
      );
    });
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {avg ? <Ptext>متوسط طول دوره‌ها: {avg} روز</Ptext> : null}
        <VictoryChart
          horizontal
          height={600}
          scale={{ x: 'time' }}
          // animate={{ duration: 500, easing: 'bounce' }}
          // containerComponent={
          //    <VictoryZoomContainer allowZoom={false} zoomDimension="x" />
          // }
          // domainPadding={{ x: -100 }}
        >
          <VictoryAxis
            dependentAxis
            invertAxis
            orientation="top"
            style={{
              axis: { stroke: 'none' },
              tickLabels: { fill: 'none', fontFamily: FONT.light },
            }}
            tickValues={[7, 14, 21, 28, 35]}
            tickFormat={(t) => `'`}
          />
          {cycles.map((cycle, i) => {
            return (
              <VictoryStack
                key={i}
                labels={({ datum }) => cycle[0].cycleId}
                labelComponent={
                  <VictoryLabel
                    direction="rtl"
                    verticalAnchor="middle"
                    textAnchor="end"
                    dy={-25}
                    x={WIDTH - 50}
                    style={{ fontFamily: FONT.medium }}
                  />
                }>
                {renderBars(cycle)}
              </VictoryStack>
            );
          })}
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Analysis;
