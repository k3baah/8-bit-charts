import React, { useState, useEffect, useRef } from 'react';
import { BarChart } from './BarChart';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import domToImage from 'dom-to-image';
import CustomLayer from './BarDesign';
import theme from './ChartTheme'
import Papa from 'papaparse';
import { colorSets } from './BarDesign'
import 'nes.icons/css/nes-icons.min.css';

function App() {

  const containerRef = useRef();
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState('1.3 Messages Per Year.csv'); // Default filename
  const [xColumn, setXColumn] = useState('year'); // Default x-axis column
  const [yColumns, setYColumns] = useState(['message_count']); // Default y-axis column
  const initialLabelVisibility = yColumns.reduce((acc, key) => {
    acc[key] = true; // Start with all labels visible
    return acc;
  }, {});

  const [labelVisibility, setLabelVisibility] = useState(initialLabelVisibility);
  const [showHeroMetric, setShowHeroMetric] = useState(false); // State to toggle hero metric
  const [selectedColumn, setSelectedColumn] = useState(''); // State for selected column
  const [aggregationType, setAggregationType] = useState('sum'); // State for aggregation type ('sum', 'average', etc.)
  const toggleHeroMetric = () => {
    setShowHeroMetric(!showHeroMetric);
  };
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [comparisonColumn, setComparisonColumn] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');
  const [title, setTitle] = useState('');

  const [availableFiles, setAvailableFiles] = useState([
    '1.x Messages Per Day.csv',
    '1.3 Messages Per Year.csv',
    '1.3.1 Messages p_d Per Year.csv',
    '1.4 Messages per Month.csv',
    '1.5 Messages Per Week (1).csv',
    '1.6 Average Messages Per Day Of Week.csv',
    '1.6.2 Most Active Day.csv',
    '1.7 Messages Per Hour.csv',
    '2.1 Messages Per Person Per Year .csv',
    '2.3 Average Messages Per Person Per Day.csv',
    '3.0.2 Reacts by type (1).csv',
    '3.2 React Received Histogram Per Person (1).csv',
    // Add more filenames as needed
  ]);

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [colorMode, setColorMode] = useState('dynamic'); // 'dynamic', 'solid'
  const [selectedColorSet, setSelectedColorSet] = useState('BLUES'); // Default to 'BLUES'
  const [selectedColorSets, setSelectedColorSets] = useState(['BLUES']); // Default to 'BLUES'
  // const [dynamicColoringMode, setDynamicColoringMode] = useState('key'); // 'key' or 'indexValue'
  // Add new states for the column-based dynamic coloring mode and the selected column for coloring
  const [dynamicColoringColumn, setDynamicColoringColumn] = useState('');
  // Update the dynamicColoringMode state initialization to include the new mode
  const [dynamicColoringMode, setDynamicColoringMode] = useState('key'); // Add 'columnValue' as an option later in the dropdown

  const [showChartLabels, setShowChartLabels] = useState(true); // Default is true to show labels
  const [showAxisLeft, setShowAxisLeft] = useState(true); // Default is true to show the left axis

  const [calendarData, setCalendarData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);


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

  const [distinctFilterValues, setDistinctFilterValues] = useState([]);

  useEffect(() => {
    if (filterColumn) {
      const uniqueValues = new Set(data.map(row => row[filterColumn]));
      setDistinctFilterValues([...uniqueValues]);
    }
  }, [filterColumn, data]);

  // Handler for selecting color sets with order preservation
  const handleColorSetSelection = (colorSet) => {
    setSelectedColorSets(prevSelectedColorSets => {
      // Check if the colorSet is already selected
      if (prevSelectedColorSets.includes(colorSet)) {
        // Remove the colorSet from the selection
        return prevSelectedColorSets.filter(selectedColorSet => selectedColorSet !== colorSet);
      } else {
        // Add the colorSet to the selection, preserving order
        return [...prevSelectedColorSets, colorSet];
      }
    });
  };

  const MyResponsiveBar = () => (
    <div style={{ height: 600 , width:2000}}>
      <ResponsiveBar
        data={data}
        keys={yColumns}
        indexBy={xColumn}
        layers={['grid', 'axes', props => <CustomLayer {...props} labelVisibility={labelVisibility} colorMode={colorMode} selectedColorSets={selectedColorSets} dynamicColoringMode={dynamicColoringMode} columnName={dynamicColoringColumn} showChartLabels={showChartLabels} />, 'markers', 'legends', 'annotations']}
        margin={{ top: 50, right: 170, bottom: 75, left: 120 }}
        padding={0.3}
        colors={selectedColorSets.map(set => colorSets[set].mainColor)}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        theme={theme}
        axisLeft={showAxisLeft ? { tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: -40 } : null}
        axisBottom={{
          tickSize: 10,
          tickPadding: 5,
          // tickRotation: -20, // Rotate ticks by -45 degrees
          legendOffset: 50,
          // itemHeight: 100,
          // symbolSize: 20,
        }}
        groupMode='grouped'
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            // anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 110,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
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
        link.download = `${title}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting the chart:', error);
      });
  };

  const calculateHeroMetric = () => {
    let filteredData = data;
    // Ensure both filterColumn and filterValue are considered
    if (filterColumn && filterValue) {
      filteredData = data.filter(row => String(row[filterColumn]) === filterValue);
    }

    let aggregatedValue = 0;
    switch (aggregationType) {
      case 'sum':
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[selectedColumn] || 0), 0).toFixed(0);
        break;
      case 'average':
        aggregatedValue = (filteredData.reduce((acc, row) => acc + parseFloat(row[selectedColumn] || 0), 0) / filteredData.length).toFixed(2);
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
        aggregatedValue = filteredData.reduce((acc, row) => acc + parseFloat(row[comparisonColumn] || 0).toFixed(0), 0);
        break;
      case 'average':
        aggregatedValue = (filteredData.reduce((acc, row) => acc + parseFloat(row[comparisonColumn] || 0), 0) / filteredData.length).toFixed(0);
        break;
      // Implement other aggregation types as needed
    }

    return parseFloat(aggregatedValue);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const heroMetric = calculateHeroMetric();
  const comparisonMetric = calculateComparisonMetric();
  const comparisonResult = ((heroMetric - comparisonMetric) / comparisonMetric) * 100;
  const isComparisonPositive = comparisonResult >= 0;

  const transformDataForHeatmap = (csvData) => {
    // Assuming csvData is an array of objects where each object represents a row in the CSV
    // And the first row (headers) contains the names, which are used as IDs
  
    // Initialize an empty array to hold the transformed data
    let transformedData = [];
  
    // Check if csvData is valid
    if (csvData && csvData.length > 0) {
      // Get all keys (column names) except for the first two ('month', 'month_name')
      const personNames = Object.keys(csvData[0]).slice(1);
  
      // Iterate over each person to create their data structure
      personNames.forEach(personName => {
        const personData = {
          id: personName,
          data: csvData.map(monthData => ({
            x: monthData.hour, // Using month_name for x
            y: +monthData[personName] || 0 // Convert to number, default to 0 if undefined
          }))
        };
        transformedData.push(personData);
      });
    }
  
    return transformedData;
  };

  useEffect(() => {
    const loadCsvDataForHeatmap = () => {
      fetch(`/data/2.6 Average Messages Per Hour of Day (1).csv`)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            complete: (results) => {
              // Assuming the first row contains headers
              const headers = results.meta.fields;
  
              // Process the data rows to include all columns dynamically
              const formattedData = results.data.map(row => {
                const rowData = {};
                headers.forEach(header => {
                  rowData[header] = row[header];
                });
                return rowData;
              });
  
              // Transform the data for the heatmap
              const transformedHeatmapData = transformDataForHeatmap(formattedData);
              setHeatmapData(transformedHeatmapData);
            },
            header: true,
          });
        })
        .catch(err => console.error('Error loading CSV for heatmap:', err));
    };
  
    loadCsvDataForHeatmap();
  }, [filename]); // Dependency array to re-run the effect when filename changes

  const MyResponsiveHeatMap = ({ heatmapData /* see data tab */ }) => (
    <ResponsiveHeatMap
        data={heatmapData}
        margin={{ top: 60, right: 90, bottom: 60, left: 200 }}
        theme = {theme}
        // enableLabels={false}
        valueFormat=".2f"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation:0,
            legend: '',
            legendOffset: 46,
            truncateTickAt: 0
        }}
        
        axisLeft={{
            tickSize: 5,
            tickPadding: 20,
            tickRotation: 0,
            // legend: 'country',
            legendPosition: 'middle',
            legendOffset: 0,
            truncateTickAt: 0
        }}
        // colors={['#B1CDFC','#75A6FA', '#4E8CF9', '#2673F7', '#3b82f6', '#2877F6', '#0748B0']}
        colors={{
            type: 'sequential',
            scheme: 'blues',
            // minValue: 0,
            // maxValue: 2500
        }}
        emptyColor="#555555"
        legends={[
            {
                anchor: 'bottom',
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: '>-.2s',
                title: 'Value →',
                titleAlign: 'start',
                titleOffset: 4
            }
        ]}
    />
)

useEffect(() => {
  const loadCsvDataForCalendar = () => {
    fetch(`/data/1.x Messages Per Day.csv`)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          complete: (results) => {
            // Ensure results.data is an array and has content before mapping
            if (Array.isArray(results.data) && results.data.length > 0) {
              const formattedDataForCalendar = results.data.map(row => ({
                day: row.date, // Assuming your CSV has a 'date' column for dates
                value: parseInt(row.msgs, 10) // Assuming 'msgs' is the column for message counts
              }));
              setCalendarData(formattedDataForCalendar);
            }
          },
          header: true,
        });
      })
      .catch(err => console.error('Error loading CSV for calendar:', err));
  };

  loadCsvDataForCalendar();
}, [filename]); // Dependency array to re-run the effect when filename changes

// Ensure calendarData is passed correctly to MyResponsiveCalendar
// This part seems correct as per your snippet, assuming calendarData state is correctly set up and updated

  const MyResponsiveCalendar = ({ calendarData }) => (
      <ResponsiveCalendar
        data={calendarData}
        from="2023-01-01"
        to="2023-12-31"
        emptyColor="#eeeeee"
        // colors={['#61cdbb', '#97e3d5', '#026F49', '#00CC3F']}
        colors={['#B1CDFC','#75A6FA', '#4E8CF9', '#2673F7', '#3b82f6', '#2877F6', '#0748B0']}
        margin={{ top: 0, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="transparent"
        dayBorderWidth={2}
        dayBorderColor="#1E1E1E"
        // daySpacing={1}
        minValue={'auto'}
        theme = {theme}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
  )

  console.log(heatmapData)
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
          <select className='colors' value={colorMode} onChange={e => setColorMode(e.target.value)}>
            <option value="dynamic">Dynamic</option>
            <option value="solid">Solid</option>
          </select>
        </label>
        {colorMode === 'dynamic' && (
          <>
            <label className='subtitle' style={{ color: 'white' }}>
              Dynamic Coloring Mode:
              <select className='colors' value={dynamicColoringMode} onChange={e => setDynamicColoringMode(e.target.value)}>
                <option value="key">By Key</option>
                <option value="indexValue">By Index Value</option>
                <option value="columnValue">By Column Value</option> {/* Add this line */}
              </select>
            </label>
            <label className='subtitle' style={{ color: 'white' }}>
              Select Color Sets:
              <div className='colors'>
                {Object.keys(colorSets).map(key => (
                  <div key={key} onClick={() => handleColorSetSelection(key)} style={{ cursor: 'pointer', backgroundColor: selectedColorSets.includes(key) ? '#ccc' : 'transparent' }}>
                    {key}
                  </div>
                ))}
              </div>
            </label>
            {dynamicColoringMode === 'columnValue' && ( // Add this block
              <label className='subtitle' style={{ color: 'white' }}>
                Select Column for Coloring:
                <select className='colors' value={dynamicColoringColumn} onChange={e => setDynamicColoringColumn(e.target.value)}>
                  {columnHeaders.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </label>
            )}
          </>
        )}
        {colorMode === 'solid' && (
          <label className='subtitle' style={{ color: 'white' }}>
            Select Color Set:
            <select className='colors' value={selectedColorSet} onChange={e => setSelectedColorSet(e.target.value)}>
              {Object.keys(colorSets).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div>
        <label className='subtitle' style={{ color: 'white' }}>Column:
          <select className='hero' value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>Aggregation:
          <select className='hero' value={aggregationType} onChange={e => setAggregationType(e.target.value)}>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            {/* Add more aggregation types as needed */}
          </select>
        </label>

        <button className='hero' style={{}} onClick={toggleHeroMetric}>Toggle Hero Metric</button>
      </div>

      <div>
        <label className='subtitle' style={{ color: 'white' }}>Filter Column:
          <select className='filter' value={filterColumn} onChange={e => setFilterColumn(e.target.value)}>
            {columnHeaders.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </label>

        <label className='subtitle' style={{ color: 'white' }}>Filter Value:
          <select className='filter' value={filterValue} onChange={e => setFilterValue(e.target.value)}>
            <option value="">Select a value</option>
            {distinctFilterValues.map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>

      <label className='subtitle' style={{ color: 'white' }}>Comparison Column:
        <select className='comparison' value={comparisonColumn} onChange={e => setComparisonColumn(e.target.value)}>
          {columnHeaders.map(header => (
            <option key={header} value={header}>{header}</option>
          ))}
        </select>
      </label>

      <label className='subtitle' style={{ color: '#6b7280', fontSize: '24px' }}>
        vs
        <input
          type="text"
          value={comparisonValue}
          onChange={(e) => setComparisonValue(e.target.value)}
          style={{ fontSize: '24px', color: '#6b7280', border: '5px', borderColor: 'white', backgroundColor: 'transparent', outline: '2px' }}
        />
      </label>
      <label className='subtitle' style={{ color: '#6b7280', fontSize: '24px' }}>
        title
        <input
          className='subtitle'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontSize: '32px', color: '#6b7280', margin: '0', border: 'none', backgroundColor: 'transparent', outline: 'none' }}
        />
      </label>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label className='subtitle' style={{ color: 'white' }}>
          Show Chart Labels:
          <input
            type="checkbox"
            checked={Object.values(labelVisibility).every(Boolean)} // "All" is checked if all keys are true
            onChange={(e) => {
              const newVisibility = Object.keys(labelVisibility).reduce((acc, key) => {
                acc[key] = e.target.checked; // Set all keys to the checkbox's checked state
                return acc;
              }, {});
              setLabelVisibility(newVisibility);
            }}
            style={{ marginLeft: '8px' }}
          /> All
        </label>
        {yColumns.map((key) => (
          <label key={key} className='subtitle' style={{ color: 'white', display: 'block' }}>
            <input
              type="checkbox"
              checked={labelVisibility[key]}
              onChange={() => {
                setLabelVisibility((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }));
              }}
              style={{ marginLeft: '8px' }}
            /> {key}
          </label>
        ))}
      </div>
      <div>
        <label className='subtitle' style={{ color: 'white' }}>
          Show Left Axis:
          <input
            type="checkbox"
            checked={showAxisLeft}
            onChange={() => setShowAxisLeft(!showAxisLeft)}
            style={{ marginLeft: '8px' }}
          />
        </label>
      </div>

      <div ref={containerRef} style={{ padding: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* <h2 className='subtitle' style={{ fontSize: '32px', padding: '0px', color: 'white', margin: '0' }}>Messages Sent</h2> */}
          <h2 className='subtitle' style={{ fontSize: '32px', color: '#94a3b8', margin: '0' }}>{title}</h2>
          {showHeroMetric && (
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <h2 className='title' style={{ fontSize: '64px', paddingTop: '32px', margin: '0' }}>
                {formatNumberWithCommas(heroMetric)}
              </h2>
              {/* <div style={{ fontSize: '32px', color: isComparisonPositive ? 'green' : 'red', display: 'flex', alignItems: 'center', padding: '24px' }}>
                <i className={`nes-icon ${isComparisonPositive ? 'caret-up' : 'caret-down'}`}></i>
                <span className='title' style={{ marginLeft: '8px' }}>{formatNumberWithCommas(Math.abs(comparisonResult).toFixed(0))}%</span>
              </div> */}
              <p className='subtitle' style={{ color: '#6b7280', fontSize: '24px' }}>  {comparisonValue} </p>
            </div>
          )}
          <p className='subtitle' style={{ color: '#6b7280', fontSize: '32px' }}>  Messages </p>
        </div>
        <div style={{ paddingTop: '120px'}}><MyResponsiveBar /></div>
        {/* <div style={{ paddingTop: '120px' }}><DefaultResponsiveBar /></div> */}
        {/* <div style={{ height: '1000px', width:'2000px'}}>{heatmapData.length > 0 && <MyResponsiveHeatMap heatmapData={heatmapData} />}</div> */}
        {/* <div style={{ height: '600px' }}>{calendarData.length > 0 && <MyResponsiveCalendar calendarData={calendarData} />}</div> */}
      </div>
      <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
      {/* <div style={{ height: '600px' }}>{calendarData.length > 0 && <MyResponsiveCalendar calendarData={calendarData} />}</div> */}
    </div>
  );
}

export default App;
