import React from 'react';
import { Flex } from 'antd';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const ChartCanvas = ({ data, drawChart }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      drawChart(d3.select(d3Container.current), data);
    }
  }, [data, drawChart]);

  return (
    <div className='mx-6 mt-12 min-h-[75vh] rounded-md border border-slate-300'>
      <Flex>
        <div ref={d3Container}></div>
      </Flex>
    </div>
  );
};

export default ChartCanvas;