import React, { useState } from 'react';
import Navbar from './components/NavBar';
import DataConfig from './components/DataConfig';
import ChartConfig from './components/ChartConfig';
import ColorConfig from './components/ColoursConfig';
import OtherConfig from './components/OtherConfig';
import ChartCanvas from './components/ChartCanvas';
import BarChart from './components/charts/BarChart'; 
import { DataProvider } from './components/DataContext';

const App = () => {
  const [currentConfig, setCurrentConfig] = useState('data');
  // const { dataSources, selectedTable } = useData();

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
                <BarChart />
              </ChartCanvas>
            )}
          </>
        )}
      </div>

    </DataProvider>
  );
};

export default App;