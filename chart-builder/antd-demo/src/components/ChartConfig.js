import React, { useState, useEffect, useMemo } from 'react';
import { BarChartOutlined, PieChartOutlined, LineChartOutlined, HeatMapOutlined, CalendarOutlined, TableOutlined, DotChartOutlined, BorderOutlined, BuildOutlined, EditOutlined, SignatureOutlined } from '@ant-design/icons';
import { Flex, Button, Select } from 'antd';
import { useData } from './DataContext';

const ChartConfig = () => {
  const { fileList, columns, selectedTable, setSelectedTable, dataSources, selectedKey, setSelectedKey, selectedValues, setSelectedValues  } = useData(); // Assuming dataSources is available via useData for checking data types
  const fileOptions = fileList.map(file => ({ value: file.name, label: file.name }));

  // Assuming dataSources[selectedTable] exists and has at least one row for type inference
  const firstRow = useMemo(() => dataSources[selectedTable]?.[0] || {}, [dataSources, selectedTable]);

  const columnOptions = columns[selectedTable]?.map(column => ({
    value: column.dataIndex,
    label: column.title,
    isNumeric: !isNaN(firstRow[column.dataIndex]) // Infer numeric based on first row's data
  })) || [];

  // Filter options for numeric values only
  const numericColumnOptions = columnOptions.filter(option => option.isNumeric);
  const [selectedFile, setSelectedFile] = useState(undefined);
  // Update selectedFile when fileList changes
  useEffect(() => {
    if (fileList.length > 0) {
      const lastUploadedFile = fileList[fileList.length - 1].name;
      setSelectedFile(lastUploadedFile);
    }
  }, [fileList]);



  useEffect(() => {
    // Recalculate column options based on the newly selected table
    const newColumnOptions = columns[selectedTable]?.map(column => ({
      value: column.dataIndex,
      label: column.title,
      isNumeric: !isNaN(firstRow[column.dataIndex]) // Reusing your existing logic for numeric inference
    })) || [];

    // Update selectedKey to the first column's dataIndex or undefined if no columns are available
    setSelectedKey(newColumnOptions.length > 0 ? newColumnOptions[0].value : undefined);

    // Filter newColumnOptions for numeric values only and update selectedValues
    const newNumericColumnOptions = newColumnOptions.filter(option => option.isNumeric);
    setSelectedValues(newNumericColumnOptions.length > 0 ? [newNumericColumnOptions[0].value] : []);
  }, [selectedTable, columns, firstRow]);

  return (
    <div className='my-6 mx-6'>
      <Flex gap='large'>
        <Flex vertical>
          <div className='my-3'>Chart Type</div>
          <Flex gap='small'>
            <Button icon={<BarChartOutlined />}>Bar Chart</Button>
            <Button icon={<PieChartOutlined />} disabled>Pie Chart</Button>
            <Button icon={<LineChartOutlined />} disabled>Line Chart</Button>
            <Button icon={<DotChartOutlined />} disabled>Scatter Chart</Button>
            <Button icon={<HeatMapOutlined />} disabled>Heatmap</Button>
            <Button icon={<CalendarOutlined />} disabled>Calendar</Button>
            <Button icon={<TableOutlined />} disabled>Table</Button>
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Chart Style</div>
          <Flex gap='small'>
            <Button icon={<BorderOutlined />} disabled>Modern</Button>
            <Button icon={<BuildOutlined />} disabled>Pixel Art</Button>
            <Button icon={<EditOutlined />} disabled>Sketch</Button>
            <Button icon={<SignatureOutlined />} disabled>Fancy</Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap='large'>
        <Flex vertical>
          <div className='my-3'>Data</div>
          <Flex gap='small'>
            <Select
              style={{ width: 200 }}
              options={fileOptions}
              value={selectedTable} // Use state for value
              onChange={value => setSelectedTable(value)} // Update DataContext // Update state on change
              disabled={fileOptions.length === 0}
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Key</div>
          <Flex gap='small'>
            <Select
              style={{ width: 200 }}
              options={columnOptions}
              value={selectedKey}
              onChange={(value) => {
                console.log('New selectedKey:', value);
                setSelectedKey(value);
              }}
              disabled={columnOptions.length === 0}
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Values</div>
          <Flex gap='small'>
            <Select
              mode="multiple"
              style={{ width: 200 }}
              options={numericColumnOptions}
              value={selectedValues}
              onChange={(values) => {
                console.log('New selectedValues:', values);
                setSelectedValues(values);
              }}
              disabled={numericColumnOptions.length === 0}
            />
          </Flex>
        </Flex>
      </Flex>

    </div>
  );
};

export default ChartConfig;