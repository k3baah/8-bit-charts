import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BaseChart = ({ data, drawChart }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      drawChart(d3.select(d3Container.current), data);
    }
  }, [data, drawChart]);

  return (
    <div className="chart-container" ref={d3Container}></div>
  );
};

export default BaseChart;