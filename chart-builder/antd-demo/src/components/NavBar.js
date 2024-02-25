import React, { useState } from 'react';
import { BorderlessTableOutlined, BarChartOutlined, BgColorsOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label:  'Data',
    key: 'data',
    icon: <BorderlessTableOutlined />,
  },
  {
    label: 'Charts',
    key: 'charts',
    icon: <BarChartOutlined />,
  },
  {
    label: 'Colours',
    key: 'colours',
    icon: <BgColorsOutlined />,
  },
  {
    label: 'Other',
    key: 'other',
    icon: <PlusSquareOutlined />,
  },
];


const Navbar = ({ setCurrentConfig }) => { // Use destructuring to get setCurrentConfig from props
  return <Menu onClick={(e) => setCurrentConfig(e.key)} selectedKeys={[items[0].key]} mode="horizontal" items={items} />;
};

export default Navbar;