import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Table, Divider, message, Upload, Select } from 'antd';
import Papa from 'papaparse';

const { Dragger } = Upload;

const DataConfig = () => {
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const [tableNames, setTableNames] = useState([]);

    const handleFileRead = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                const data = result.data;
                if (data.length > 0) {
                    // Assuming the first row contains column headers
                    const headers = data[0];
                    const formattedColumns = headers.map((header, index) => ({
                        title: header,
                        dataIndex: header.toLowerCase(),
                        key: index,
                    }));
                    setColumns(formattedColumns);

                    // Convert the rest of the data into dataSource format
                    const formattedData = data.slice(1).map((row, index) => {
                        const rowData = {};
                        headers.forEach((header, i) => {
                            rowData[header.toLowerCase()] = row[i];
                        });
                        return { key: index, ...rowData };
                    });
                    setDataSource(formattedData);
                }
            },
            header: false,
        });
    };

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            handleFileRead(file);
            setTableNames(prevNames => [...prevNames, file.name]);
            return false; // Prevent actual upload
        },
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
        onRemove: (file) => {
            setTableNames(prevNames => {
                const updatedNames = prevNames.filter(name => name !== file.name);
                // If there are no more tables left, clear both the dataSource and columns
                if (updatedNames.length === 0) {
                    setDataSource([]);
                    setColumns([]); // Clear columns here
                }
                return updatedNames;
            });
        },
    };

    return (
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
                {tableNames.length > 0 && (
                    <Select
                        className='w-64'
                        placeholder={''}
                        defaultValue={tableNames[0]}
                    >
                        {tableNames.map((name, index) => (
                            <Select.Option key={index} value={name}>
                                {name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </div>
            <div className='mt-6'>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

export default DataConfig;