import React, { useState, useEffect, useRef } from 'react';

import { ResponsiveBar } from '@nivo/bar';
import domToImage from 'dom-to-image';
import CustomLayer from './BarDesign';
import theme from './ChartTheme'
import Papa from 'papaparse';
import 'nes.icons/css/nes-icons.min.css';

function App() {

  const containerRef = useRef();
  const [data, setData] = useState([]);
  const filename = '1.3 Messages Per Year.csv'

  useEffect(() => {
    const loadCsvData = () => {
      fetch(`/data/${filename}`)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            complete: (results) => {
              // Assuming your CSV has 'year' and 'message_count' columns
              const formattedData = results.data.map(row => ({
                year: row.year,
                message_count: +row.message_count, // Convert message_count to a number
              }));
              setData(formattedData); // Update state with the formatted data
            },
            header: true,
          });
        })
        .catch(err => console.error('Error loading CSV:', err));
    };

    loadCsvData();
  }, []);

  const MyResponsiveBar = () => (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        layers={['grid', 'axes', 'bars', CustomLayer, 'markers', 'legends', 'annotations']}
        keys={['message_count']}
        indexBy="year"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        theme={theme}
        axisLeft={null}
      />
    </div>
  );

  const exportToPNG = () => {
    domToImage.toPng(containerRef.current, {
      style: {
        backgroundColor: 'transparent',
      }
    })
      .then((dataUrl) => {
        // Create a link to download the image
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting the chart:', error);
      });
  };
  return (
    <div>
      <div ref={containerRef} style={{ padding: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* <h2 className='subtitle' style={{ fontSize: '32px', padding: '0px', color: 'white', margin: '0' }}>Messages Sent</h2> */}
          <h2 className='subtitle' style={{ fontSize: '32px', color: '#6b7280', margin: '0' }}>Messages Sent</h2>

          <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <h2 className='title' style={{ fontSize: '64px', paddingTop: '32px', margin: '0' }}>61,566</h2>
            <div style={{ fontSize: '32px', color: 'red', display: 'flex', alignItems: 'center', padding:'24px' }}>
              <i className="nes-icon caret-down"></i><span className='title' style={{ marginLeft: '8px' }}>21%</span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '120px' }}><MyResponsiveBar /></div>
      </div>
      <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
    </div>
  );
}

export default App;
