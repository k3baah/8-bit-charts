import React from 'react';
import { BarChartOutlined, PieChartOutlined, LineChartOutlined, HeatMapOutlined, CalendarOutlined, TableOutlined, DotChartOutlined, BorderOutlined, BuildOutlined, EditOutlined, SignatureOutlined } from '@ant-design/icons';
import { Flex, Button, Select } from 'antd';
import { useData } from './DataContext';

const ChartConfig = () => {
  const { fileList, columns, selectedTable } = useData(); // Use the useData hook to access DataContext values

  // Convert fileList and columns to options format expected by Ant Design Select
  const fileOptions = fileList.map(file => ({ value: file.name, label: file.name }));
  // const columnOptions = Object.keys(columns).map(column => ({ value: column, label: column }));
  const columnOptions = columns[selectedTable]?.map(column => ({
    value: column.dataIndex, // Use dataIndex as the value since it's unique
    label: column.title // Use the title for the label
  })) || [];

  return (
    <div className='my-6 mx-6'>
      <Flex gap='large'>
        <Flex vertical>
          <div className='my-3'>Chart Type</div>
          <Flex gap='small'>
            <Button icon={<BarChartOutlined />}>Bar Chart</Button>
            <Button icon={<PieChartOutlined />}>Pie Chart</Button>
            <Button icon={<LineChartOutlined />}>Line Chart</Button>
            <Button icon={<DotChartOutlined />}>Scatter Chart</Button>
            <Button icon={<HeatMapOutlined />}>Heatmap</Button>
            <Button icon={<CalendarOutlined />}>Calendar</Button>
            <Button icon={<TableOutlined />}>Table</Button>
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Chart Style</div>
          <Flex gap='small'>
            <Button icon={<BorderOutlined />}>Modern</Button>
            <Button icon={<BuildOutlined />}>Pixel Art</Button>
            <Button icon={<EditOutlined />}>Sketch</Button>
            <Button icon={<SignatureOutlined />}>Fancy</Button>
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
              value={fileOptions.length > 0 ? fileOptions[0].value : undefined} // Set default value to the first option if available
              disabled={fileOptions.length === 0} // Disable if no options are available
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Key</div>
          <Flex gap='small'>
            <Select
              style={{ width: 200 }}
              options={columnOptions}
              value={columnOptions.length > 0 ? columnOptions[0].value : undefined} // Set default value to the first option if available
              disabled={columnOptions.length === 0} // Disable if no options are available
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Values</div>
          <Flex gap='small'>
            <Select
              mode='multiple'
              style={{ width: 200 }}
              options={columnOptions}
              value={columnOptions.length > 0 ? [columnOptions[0].value] : []} // Set default value to the first option if available
              disabled={columnOptions.length === 0} // Disable if no options are available
            />
          </Flex>
        </Flex>
      </Flex>

    </div>
  );
};

export default ChartConfig;