import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory';
import { useData } from '../DataContext';

const BarChart = () => {
  const { dataSources, selectedTable, selectedKey, selectedValues } = useData();

  const chartData = dataSources[selectedTable] || [];
  const transformedData = selectedValues.map(value => {
    return chartData.map(item => ({
      x: item[selectedKey] || '',
      y: isNaN(Number(item[value])) ? '' : Number(item[value])
    }));
  });

  console.log("Current transformed data:", transformedData);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      width={500}
      height={200}
    >
      <VictoryAxis
        tickValues={chartData.map(d => d[selectedKey])}
        tickFormat={chartData.map(d => d[selectedKey])}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(y) => (`${y}`)}
      />
      <VictoryGroup
        offset={20}
        colorScale={"qualitative"}
      >
        {transformedData.map((data, index) => (
          <VictoryBar
            key={selectedValues[index]}
            data={data}
            x="x"
            y="y"
          />
        ))}
      </VictoryGroup>
    </VictoryChart>
  );
};

export default BarChart;