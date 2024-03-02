import React, { useState } from 'react';
import Navbar from './components/NavBar';
import DataConfig from './components/DataConfig';
import ChartConfig from './components/ChartConfig';
import ColorConfig from './components/ColoursConfig';
import OtherConfig from './components/OtherConfig';
import ChartCanvas from './components/ChartCanvas';
import { DataProvider } from './components/DataContext';
import { drawBarChart } from './d3charts/drawBarChart'; // Import the drawBarChart function

const App = () => {
  const [currentConfig, setCurrentConfig] = useState('data');
  const sampleData = [ // Sample data for the bar chart
    { label: 'A', value: 120 },
    { label: 'B', value: 150 },
    { label: 'C', value: 80 },
    { label: 'D', value: 70 }
  ];

  return (
    <DataProvider>
      <div>
        <Navbar currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
        {currentConfig === 'data' ? (
          <div className='mx-6 my-6'>
            <DataConfig />
          </div>
        ) : (
          <>
            {currentConfig === 'charts' && <ChartConfig />}
            {currentConfig === 'colours' && <ColorConfig />}
            {currentConfig === 'other' && <OtherConfig />}
            {currentConfig === 'charts' && <ChartCanvas data={sampleData} drawChart={drawBarChart} />}
          </>
        )}
      </div>
    </DataProvider>
  );
};

export default App;