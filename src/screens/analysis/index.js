import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import styles from './styles';
import CycleModule from '../../util/cycle';
import { COLOR, FONT, HEIGHT, WIDTH } from '../../styles/static';
import Ptext from '../../components/Ptxt';
import { Icon } from 'react-native-elements';
import Loader from '../../components/Loader';

const Analysis = ({ navigation }) => {
  const [cycles, setCycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avgCycleLength, setAvgCycleLength] = useState();
  const [avgPeriodLength, setAvgPeriodLength] = useState();

  useEffect(() => {
    navigation.addListener('focus', async () => {
      initialData();
    });
  }, [navigation]);
  useEffect(() => {
    initialData();
  }, []);
  useEffect(() => {
    const popped = cycles.splice(0, cycles.length - 1);
    setAvgCycleLength(
      Math.round(
        popped.reduce((a, b) => parseInt(a) + b.length, 0) / popped.length,
      ),
    );
    setAvgPeriodLength(
      Math.round(
        popped.reduce(
          (a, b) =>
            parseInt(a) + b.filter((obj) => obj.type === 'period').length,
          0,
        ) / popped.length,
      ),
    );
  }, [cycles]);
  const initialData = async () => {
    const c = await CycleModule();
    const d = await c.determineEachCycleDayType();
    setCycles(d);
    setIsLoading(!isLoading);
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
                return day.type === 'period' ? COLOR.pink : COLOR.bgColor;
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
    <SafeAreaView
      contentContainerStyle={styles.container}
      style={styles.safeAreaView}>
      {isLoading ? (
        <Loader />
      ) : cycles.length > 1 ? (
        <ScrollView style={styles.bg}>
          <View style={styles.summary}>
            {avgCycleLength ? (
              <View style={styles.circleContainer}>
                <View style={styles.circle}>
                  <Ptext>{avgCycleLength} روز</Ptext>
                </View>
                <Ptext>میانگین طول دوره‌ها</Ptext>
              </View>
            ) : null}
            {avgPeriodLength ? (
              <View style={styles.circleContainer}>
                <View style={styles.circle}>
                  <Ptext>{avgPeriodLength} روز</Ptext>
                </View>
                <Ptext>میانگین طول پریود</Ptext>
              </View>
            ) : null}
          </View>
          <VictoryChart
            horizontal
            height={cycles.length <= 3 ? 200 : HEIGHT / 1.2}
            scale={{ x: 'time' }}>
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
      ) : (
        <View style={styles.noticeContainer}>
          <Icon
            type="entypo"
            name="info-with-circle"
            color={COLOR.pink}
            size={50}
          />
          <Ptext
            style={{
              textAlign: 'center',
              lineHeight: 30,
              fontFamily: FONT.medium,
            }}>
            هنوز پریودی در شرح حال وارد نکردی.{'\n'}به محض ثبت دو دوره پریود،
            تحلیلش رو اینجا میبینی.
          </Ptext>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Analysis;
