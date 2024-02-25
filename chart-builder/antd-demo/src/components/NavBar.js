import React, { useState } from 'react';
import { BorderlessTableOutlined, BarChartOutlined, BgColorsOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Data',
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

const Navbar = () => {
  const [current, setCurrent] = useState('data'); // Changed default state to 'data' to match the keys
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Navbar;