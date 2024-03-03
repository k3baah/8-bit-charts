import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const VictoryBarChart = ({ data }) => {
  return (
    <VictoryChart 
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis
        tickValues={data.map(d => d.label)}
        tickFormat={data.map(d => d.label)}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x}`)}
      />
      <VictoryBar
        data={data}
        x="label"
        y="value"
      />
    </VictoryChart>
  );
};

export default VictoryBarChart;