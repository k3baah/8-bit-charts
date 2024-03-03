import React, { useState } from 'react';
import Navbar from './components/NavBar';
import DataConfig from './components/DataConfig';
import ChartConfig from './components/ChartConfig';
import ColorConfig from './components/ColoursConfig';
import OtherConfig from './components/OtherConfig';
import ChartCanvas from './components/ChartCanvas';
import VictoryBarChart from './components/charts/VictoryBarChart'; // Ensure correct import path
import { DataProvider } from './components/DataContext';

const App = () => {
  const [currentConfig, setCurrentConfig] = useState('data');
  const sampleData = [
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
          <DataConfig />
        ) : (
          <>
            {currentConfig === 'charts' && <ChartConfig />}
            {currentConfig === 'colours' && <ColorConfig />}
            {currentConfig === 'other' && <OtherConfig />}
            {currentConfig === 'charts' && (
              <ChartCanvas>
                <VictoryBarChart data={sampleData} />
              </ChartCanvas>
            )}
          </>
        )}
      </div>
    </DataProvider>
  );
};

export default App;