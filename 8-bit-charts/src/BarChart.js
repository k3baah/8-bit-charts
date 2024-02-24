import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import CustomLayer from './BarDesign';
import { colorSets } from './BarDesign';

const BarChart = ({ data, yColumns, xColumn, labelVisibility, colorMode, selectedColorSets, dynamicColoringMode, dynamicColoringColumn, showChartLabels, showAxisLeft, theme }) => (
  <div style={{ height: 600 }}>
    <ResponsiveBar
      data={data}
      keys={yColumns}
      indexBy={xColumn}
      layers={['grid', 'axes', props => <CustomLayer {...props} labelVisibility={labelVisibility} colorMode={colorMode} selectedColorSets={selectedColorSets} dynamicColoringMode={dynamicColoringMode} columnName={dynamicColoringColumn} showChartLabels={showChartLabels} />, 'markers', 'legends', 'annotations']}
      margin={{ top: 50, right: 170, bottom: 75, left: 120 }}
      padding={0.3}
      colors={selectedColorSets.map(set => colorSets[set].mainColor)}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      theme={theme}
      axisLeft={showAxisLeft ? { tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: -40 } : null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 5,
        legendOffset: 50,
      }}
      groupMode='grouped'
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 110,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  </div>
);

export default BarChart;