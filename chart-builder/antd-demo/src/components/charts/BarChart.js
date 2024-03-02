import React from 'react';
import ChartCanvas from './ChartCanvas';
import { drawBarChart } from '../../d3charts/drawBarChart';

const BarChart = ({ data }) => {
  return <ChartCanvas data={data} drawChart={drawBarChart} />;
};

export default BarChart;