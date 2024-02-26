import React from 'react';
import { BarChartOutlined, PieChartOutlined, LineChartOutlined, HeatMapOutlined, CalendarOutlined, TableOutlined, BorderOutlined, BuildOutlined, EditOutlined, SignatureOutlined } from '@ant-design/icons';
import { Flex, Button, Select } from 'antd';

const ChartConfig = () => {
  return (
    <div className='my-6 mx-6'>
      <Flex gap='large'>
        <Flex vertical>
          <div className='my-3'>Chart Type</div>
          <Flex gap='small'>
            <Button icon={<BarChartOutlined />}>Bar Chart</Button>
            <Button icon={<PieChartOutlined />}>Pie Chart</Button>
            <Button icon={<LineChartOutlined />}>Line Chart</Button>
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
              defaultValue="Sales.csv"
              style={{
                width: 200,
              }}
              options={[
                {
                  value: 'Sales.csv',
                  label: 'Sales.csv',
                },
                {
                  value: 'Customers.csv',
                  label: 'Customers.csv',
                },
                {
                  value: 'Products.csv',
                  label: 'Products.csv',
                },
              ]}
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Key</div>
          <Flex gap='small'>
            <Select
              defaultValue="Product"
              style={{
                width: 200,
              }}
              options={[
                {
                  value: 'Product',
                  label: 'Product',
                },
                {
                  value: 'Location',
                  label: 'Location',
                },
                {
                  value: 'Customer',
                  label: 'Customer',
                },
              ]}
            />
          </Flex>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Values</div>
          <Flex gap='small'>
            <Select
            mode='multiple'
              defaultValue="Sales"
              style={{
                width: 200,
              }}
              options={[
                {
                  value: 'Sales',
                  label: 'Sales',
                },
                {
                  value: 'Last Year Sales',
                  label: 'Last Year Sales',
                },
                {
                  value: 'Quantity',
                  label: 'Quantity',
                },
              ]}
            />
          </Flex>
        </Flex>
      </Flex>

    </div>
  );
};

export default ChartConfig;