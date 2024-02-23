import React, { useState, useEffect, useRef } from 'react';

import { ResponsiveBar } from '@nivo/bar';
import domToImage from 'dom-to-image';
import CustomLayer from './BarDesign';
import theme from './ChartTheme'
import Papa from 'papaparse';
import colorSets from './BarDesign'
import 'nes.icons/css/nes-icons.min.css';

function App() {

  const containerRef = useRef();
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState('1.3 Messages Per Year.csv'); // Default filename
  const [xColumn, setXColumn] = useState('year'); // Default x-axis column
  const [yColumns, setYColumns] = useState(['message_count']); // Default y-axis column
  const [showHeroMetric, setShowHeroMetric] = useState(false); // State to toggle hero metric
  const [selectedColumn, setSelectedColumn] = useState(''); // State for selected column
  const [aggregationType, setAggregationType] = useState('sum'); // State for aggregation type ('sum', 'average', etc.)
  const toggleHeroMetric = () => {
    setShowHeroMetric(!showHeroMetric);
  };
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [comparisonColumn, setComparisonColumn] = useState('');

  const [availableFiles, setAvailableFiles] = useState([
    '1.3 Messages Per Year.csv',
    '1.5 Messages Per Week.csv',
    '1.6 Average Messages Per Day Of Week.csv'
    // Add more filenames as needed
  ]);

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [colorMode, setColorMode] = useState('dynamic'); // 'dynamic', 'solid'
  const [selectedColorSet, setSelectedColorSet] = useState('BLUES'); // Default to 'BLUES'
  const [dynamicColoringMode, setDynamicColoringMode] = useState('key'); // 'key' or 'indexValue'

  useEffect(() => {
    const loadCsvData = () => {
      fetch(`/data/${filename}`)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            complete: (results) => {
              // Assuming the first row contains headers
              const headers = results.meta.fields;
              setColumnHeaders(headers); // Update state with column headers

              // Process the data rows to include all columns dynamically
              const formattedData = results.data.map(row => {
                const rowData = {};
                headers.forEach(header => {
                  rowData[header] = row[header];
                });
                return rowData;
              });
              setData(formattedData);
            },
            header: true,
          });
        })
        .catch(err => console.error('Error loading CSV:', err));
    };

    loadCsvData();
  }, [filename, xColumn, yColumns]);

  const MyResponsiveBar = () => (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={yColumns}
        indexBy={xColumn}
        // layers={['grid', 'axes', 'bars', CustomLayer, 'markers', 'legends', 'annotations']}
        layers={['grid', 'axes', 'bars', props => <CustomLayer {...props} colorMode={colorMode} selectedColorSet={selectedColorSet} dynamicColoringMode={dynamicColoringMode} />, 'markers', 'legends', 'annotations']}
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
  const cleanFilename = filename.replace(/^\d+\.\d+\s+|\.\w+$/g, '');

  const calculateHeroMetric = () => {
    let filteredData = data;
    if (filterColumn && filterValue) {
      filteredData = data.filter(row => row[filterColumn] == filterValue);
    }

    let aggregatedValue = 0;
    switch (aggregationType) {
      case 'sum':
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[selectedColumn] || 0), 0);
        break;
      case 'average':
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[selectedColumn] || 0), 0) / filteredData.length;
        break;
      // Implement other aggregation types as needed
    }

    return aggregatedValue;
  };

  const calculateComparisonMetric = () => {
    let filteredData = data;
    if (filterColumn && filterValue) {
      filteredData = data.filter(row => row[filterColumn] == filterValue);
    }

    let aggregatedValue = 0;
    switch (aggregationType) {
      case 'sum':
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[comparisonColumn] || 0), 0);
        break;
      case 'average':
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[comparisonColumn] || 0), 0) / filteredData.length;
        break;
      // Implement other aggregation types as needed
    }

    return aggregatedValue;
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const heroMetric = calculateHeroMetric();
  const comparisonMetric = calculateComparisonMetric();
  const comparisonResult = ((heroMetric - comparisonMetric) / comparisonMetric) * 100;
  const isComparisonPositive = comparisonResult >= 0;

  return (

    <div>
      <div>
        <label className='subtitle' style={{ color: 'white' }}>Data:
          <select className='dropdown' value={filename} onChange={e => setFilename(e.target.value)}>
            {availableFiles.map(file => (
              <option key={file} value={file}>{file}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>X Axis:
          <select className='dropdown' value={xColumn} onChange={e => setXColumn(e.target.value)}>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>Y Axis:
          <select className='dropdown' value={yColumns} onChange={e => setYColumns(Array.from(e.target.selectedOptions).map(option => option.value))} multiple>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label className='subtitle' style={{ color: 'white' }}>
          Color Mode:
          <select className='dropdown' value={colorMode} onChange={e => setColorMode(e.target.value)}>
            <option value="dynamic">Dynamic</option>
            <option value="solid">Solid</option>
          </select>
        </label>
        {colorMode === 'dynamic' && (
          <>
            <label className='subtitle' style={{ color: 'white' }}>
              Dynamic Coloring Mode:
              <select className='dropdown' value={dynamicColoringMode} onChange={e => setDynamicColoringMode(e.target.value)}>
                <option value="key">By Key</option>
                <option value="indexValue">By Index Value</option>
              </select>
            </label>
          </>
        )}
        {colorMode === 'solid' && (
          <label className='subtitle' style={{ color: 'white' }}>
            Select Color Set:
            <select className='dropdown' value={selectedColorSet} onChange={e => setSelectedColorSet(e.target.value)}>
              {Object.keys(colorSets).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div>
        <label className='subtitle' style={{ color: 'white' }}>Column:
          <select className='dropdown' value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>Aggregation:
          <select className='dropdown' value={aggregationType} onChange={e => setAggregationType(e.target.value)}>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            {/* Add more aggregation types as needed */}
          </select>
        </label>

        <button className='dropdown' style={{}} onClick={toggleHeroMetric}>Toggle Hero Metric</button>
      </div>

      <div>
        <label className='subtitle' style={{ color: 'white' }}>Filter Column:
          <select className='dropdown' value={filterColumn} onChange={e => setFilterColumn(e.target.value)}>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>Filter Value:
          <input className='dropdown' value={filterValue} onChange={e => setFilterValue(e.target.value)} />
        </label>
      </div>

      <label className='subtitle' style={{ color: 'white' }}>Comparison Column:
        <select className='dropdown' value={comparisonColumn} onChange={e => setComparisonColumn(e.target.value)}>
          {columnHeaders.map(header => (
            <option key={header} value={header}>{header}</option>
          ))}
        </select>
      </label>



      <div ref={containerRef} style={{ padding: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* <h2 className='subtitle' style={{ fontSize: '32px', padding: '0px', color: 'white', margin: '0' }}>Messages Sent</h2> */}
          <h2 className='subtitle' style={{ fontSize: '32px', color: '#6b7280', margin: '0' }}>{cleanFilename}</h2>
          {showHeroMetric && (
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <h2 className='title' style={{ fontSize: '64px', paddingTop: '32px', margin: '0' }}>
                {formatNumberWithCommas(heroMetric)}
              </h2>
              <div style={{ fontSize: '32px', color: isComparisonPositive ? 'green' : 'red', display: 'flex', alignItems: 'center', padding: '24px' }}>
                <i className={`nes-icon ${isComparisonPositive ? 'caret-up' : 'caret-down'}`}></i>
                <span className='title' style={{ marginLeft: '8px' }}>{formatNumberWithCommas(Math.abs(comparisonResult).toFixed(0))}%</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ paddingTop: '120px' }}><MyResponsiveBar /></div>
        {/* <div style={{ paddingTop: '120px' }}><DefaultResponsiveBar /></div> */}
      </div>
      <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
    </div>
  );
}

export default App;
