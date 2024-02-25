import React, { useState } from 'react';
import Navbar from './components/NavBar';
import DataConfig from './components/DataConfig';
import ChartConfig from './components/ChartConfig';
import ColorConfig from './components/ColoursConfig';
import ChartCanvas from './components/ChartCanvas';

const App = () => {
  const [currentConfig, setCurrentConfig] = useState('data');

  return (
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
          <ChartCanvas />
        </>
      )}
    </div>
  );
};

export default App;