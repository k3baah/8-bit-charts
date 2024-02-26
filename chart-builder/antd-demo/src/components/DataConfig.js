import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import { Divider } from 'antd';
import { message, Upload } from 'antd';
import { Select } from 'antd';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const DataConfig = () => (
    <div className='m6'>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload.
            </p>
        </Dragger>
        <Divider />
        <div className='mt-6'>
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
        </div>
        <div className='mt-6'>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    </div >

);
export default DataConfig;