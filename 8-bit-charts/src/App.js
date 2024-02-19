import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import domToImage from 'dom-to-image';
import CustomLayer from './BarDesign';
import theme from './ChartTheme'


// Sample data
const data = [
  { country: 'Watson', food: 60 },
  { country: 'Froud', food: 80 },
  { country: 'Kofi', food: 45 },
  { country: 'George', food: 70 },
  { country: 'Steve', food: 50 },
];

const MyResponsiveBar = () => (
  <div style={{ height: 400 }}>
    <ResponsiveBar
      data={data}
      layers={['grid', 'axes', 'bars', CustomLayer, 'markers', 'legends', 'annotations']}
      keys={['food']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      theme={theme}
    />
  </div>
);

function App() {
  const containerRef = useRef();

  const exportToPNG = () => {
    domToImage.toPng(containerRef.current, {
      style: {
        backgroundColor: 'transparent',
      }
    })
      .then((dataUrl) => {
        // Create a link to download the image
        const link = document.createElement('a');
        link.download = 'my-chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting the chart:', error);
      });
  };
  return (
    <div style={{ textAlign: 'center', padding:'24px'}}>
      <div ref = {containerRef} style={{ textAlign: 'center', padding:'32px'}}>
      <h2 className='title' style={{ fontSize: '48px', padding: '0px', color: 'white' }}>Messages Sent</h2>
      <h2 className='subtitle' style={{ fontSize: '32px', color: '#6b7280' }}>Per Person, 2023</h2>
      <div><MyResponsiveBar /></div>
      </div>
      <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
    </div>
  );
}

export default App;
