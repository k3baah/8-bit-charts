import React from 'react';
import { Flex } from 'antd';

const ChartCanvas = ({ children }) => {
  return (
    <div className='mx-6 mt-12 min-h-[75vh] rounded-md border border-slate-300'>
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        {children}
      </Flex>
    </div>
  );
};

export default ChartCanvas;