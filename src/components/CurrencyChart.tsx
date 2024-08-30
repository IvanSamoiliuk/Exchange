import React, {useMemo} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Text} from 'react-native-svg';
import {Dimensions, View, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {CurrencyChartProps} from '../models/types';

export const CurrencyChart: React.FC<CurrencyChartProps> = ({
  data,
  rate,
  currency,
}) => {
  const chartData = useMemo(
    () => ({
      labels: data.map(item => item.exchangedate).reverse(),
      datasets: [
        {
          data: data.map(item => parseFloat(item.rate)).reverse(),
        },
      ],
    }),
    [data],
  );

  const formatXLabel = (label: string) => {
    if (!label) return '';
    const dateParts = label.split('.');
    return `${dateParts[0]}.${dateParts[1]}`;
  };

  if (data.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisInterval={2}
        chartConfig={{
          backgroundColor: COLORS.background,
          backgroundGradientFrom: COLORS.background,
          backgroundGradientTo: COLORS.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '0',
          },
        }}
        bezier
        formatXLabel={formatXLabel}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        renderDotContent={({x, y, index}) => (
          <Svg key={`dot-content-${currency}-${index}`}>
            <Text
              x={Dimensions.get('window').width / 2 - 100}
              y={50}
              fill="white"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="16">
              {`UAH/${currency}`}
            </Text>
            <Text
              x={Dimensions.get('window').width / 2 + 100}
              y={50}
              fill={COLORS.white}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="16">
              {rate}
            </Text>
          </Svg>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
