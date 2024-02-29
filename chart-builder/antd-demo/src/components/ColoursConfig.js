import React from 'react';
import { ColorPicker, Space, Flex } from 'antd';

const Demo = () => {
    return (
        <Space direction="vertical">
            <ColorPicker defaultValue="#1677ff" showText />
        </Space>
    );
}

const ColoursConfig = () => {
    return (
        <div className='mt-6 mx-6'>
            <Flex gap='large'>
                <Flex gap='small' vertical>
                    <span className='text-slate-600'>Column 1</span>
                    <Demo />
                </Flex>
                <Flex gap='small' vertical>
                    <span className='text-slate-600'>Column 2</span>
                    <Demo />
                </Flex>
                <Flex gap='small' vertical>
                    <span className='text-slate-600'>Axis</span>
                    <Demo />
                </Flex>
                <Flex gap='small' vertical>
                    <span className='text-slate-600'>Title</span>
                    <Demo />
                </Flex>
                <Flex gap='small' vertical>
                    <span className='text-slate-600'>Background</span>
                    <Demo />
                </Flex>
            </Flex>
        </div>
    );
};
export default ColoursConfig;