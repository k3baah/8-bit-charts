import React from 'react';
import { Flex, Input, Checkbox, Select } from 'antd';

const OtherConfig = () => {
  return (
    <div className='my-6 mx-6'>
      <Flex gap='large'>
        <Flex vertical>
          <div className='my-3'>Chart Title</div>
          <Input placeholder="Enter chart title" />
        </Flex>
        <Flex vertical>
          <div className='my-3'>Chart Subtitle</div>
          <Input placeholder="Enter chart subtitle" />
        </Flex>
        <Flex vertical>
          <div className='my-3'>Chart Label</div>
          <Checkbox>Display Chart Label</Checkbox>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Chart Label Format</div>
          <Select
            defaultValue="Number"
            style={{
              width: 200,
            }}
            options={[
              {
                value: 'Number',
                label: 'Number',
              },
              {
                value: 'Percentage',
                label: 'Percentage',
              },
              {
                value: 'Currency',
                label: 'Currency',
              },
            ]}
          />
        </Flex>
        <Flex vertical>
          <div className='my-3'>Hero Metric</div>
          <Checkbox>Display Hero Metric</Checkbox>
        </Flex>
        <Flex vertical>
          <div className='my-3'>Hero Metric</div>
          <Select
            defaultValue="Total Sales"
            style={{
              width: 200,
            }}
            options={[
              {
                value: 'Total Sales',
                label: 'Total Sales',
              },
              {
                value: 'Average Order Value',
                label: 'Average Order Value',
              },
              {
                value: 'Total Orders',
                label: 'Total Orders',
              },
            ]}
          />
        </Flex>
        <Flex vertical>
          <div className='my-3'>Hero Metric Aggregation</div>
          <Select
            defaultValue="Sum"
            style={{
              width: 200,
            }}
            options={[
              {
                value: 'Sum',
                label: 'Sum',
              },
              {
                value: 'Average',
                label: 'Average',
              },
              {
                value: 'Maximum',
                label: 'Maximum',
              },
              {
                value: 'Minimum',
                label: 'Minimum',
              },
            ]}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default OtherConfig;
