import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Table, Divider, message, Upload, Select } from 'antd';
import Papa from 'papaparse';

const { Dragger } = Upload;

const DataConfig = () => {
    const [dataSources, setDataSources] = useState({}); // Changed to store data by file name
    const [columns, setColumns] = useState({}); // Changed to store columns by file name
    const [tableNames, setTableNames] = useState([]);
    const [selectedTable, setSelectedTable] = useState(''); // State to keep track of the selected table

    const handleFileRead = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                const data = result.data;
                if (data.length > 0) {
                    const headers = data[0];
                    const formattedColumns = headers.map((header, index) => {
                        const dataIndex = header.toLowerCase();
                        return {
                            title: header,
                            dataIndex: dataIndex,
                            key: index,
                            sorter: (a, b) => {
                                const valueA = a[dataIndex];
                                const valueB = b[dataIndex];
                                // Handle undefined values by treating them as empty strings for comparison
                                if (valueA === undefined && valueB === undefined) {
                                    return 0;
                                }
                                if (valueA === undefined) {
                                    return -1;
                                }
                                if (valueB === undefined) {
                                    return 1;
                                }
                                // Check if the values are numbers to perform a numeric sort
                                if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                                    return Number(valueA) - Number(valueB);
                                }
                                // Fallback to string comparison if not numbers
                                return valueA.localeCompare(valueB);
                            },
                        };
                    });
                    const formattedData = data.slice(1).map((row, index) => {
                        const rowData = {};
                        headers.forEach((header, i) => {
                            rowData[header.toLowerCase()] = row[i];
                        });
                        return { key: index, ...rowData };
                    });

                    // Store data and columns under the file name key
                    setDataSources(prevSources => ({ ...prevSources, [file.name]: formattedData }));
                    setColumns(prevColumns => ({ ...prevColumns, [file.name]: formattedColumns }));
                    if (!selectedTable) setSelectedTable(file.name); // Set the first uploaded file as selected by default
                }
            },
            header: false,
        });
    };

    const handleSelectChange = (value) => {
        setSelectedTable(value); // Update the selected table based on the user's selection
    };

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            handleFileRead(file);
            setTableNames(prevNames => [...prevNames, file.name]);
            setSelectedTable(file.name); // Set the uploaded file as the selected table
            return false; // Prevent actual upload
        },
        onRemove: (file) => {
            setTableNames(prevNames => {
                const updatedNames = prevNames.filter(name => name !== file.name);
                if (updatedNames.length === 0) {
                    setDataSources({});
                    setColumns({});
                    setSelectedTable('');
                } else if (selectedTable === file.name) {
                    // If the removed file was selected, switch to another table
                    setSelectedTable(updatedNames[0]);
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
                <h2 className='mb-2 text-gray-500'>View</h2>
                {tableNames.length > 0 && (
                    <Select
                        className='w-64'
                        placeholder={''}
                        value={selectedTable} // Use the selectedTable state as the value
                        onChange={handleSelectChange} // Add onChange handler
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
                {/* Use selectedTable to determine which dataSource and columns to display */}
                <Table dataSource={dataSources[selectedTable]} columns={columns[selectedTable]}/>
            </div>
        </div>
    );
};

export default DataConfig;