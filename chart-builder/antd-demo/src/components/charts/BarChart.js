import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLegend } from 'victory';
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

  // Prepare legend data
  const legendData = selectedValues.map(value => ({
    name: value, // Assuming you want to use the selectedValues as the legend names
    symbol: { type: "square" } // Customize symbol shape, many shapes available e.g., circle, diamond, square, etc.
  }));

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      width={500}
      height={300} // Increased height to accommodate legend
    >
      <VictoryLegend x={125} y={0} // Positioning of the legend
        title="Legend"
        centerTitle
        orientation="horizontal"
        gutter={20} // Space between legend entries
        style={{ border: { stroke: "black" }, title: {fontSize: 10 } }}
        data={legendData}
      />
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