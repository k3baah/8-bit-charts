import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Table, Divider, Upload, Select } from 'antd';
import Papa from 'papaparse';
import { useData } from './DataContext'; 

const { Dragger } = Upload;

const DataConfig = () => {
    const {
        dataSources,
        setDataSources,
        columns,
        setColumns,
        tableNames,
        setTableNames,
        selectedTable,
        setSelectedTable,
        fileList,
        setFileList,
    } = useData();

    const handleFileRead = (file, onSuccess) => {
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

                    // Update the shared state
                    setDataSources(prev => ({ ...prev, [file.name]: formattedData }));
                    setColumns(prev => ({ ...prev, [file.name]: formattedColumns }));
                    setTableNames(prev => [...prev, file.name]);
                    if (!selectedTable) setSelectedTable(file.name);

                    onSuccess();
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
        fileList: fileList,
        beforeUpload: (file, fileList) => {
            // Process the file
            handleFileRead(file, () => {
                // Update fileList state
                const newFileList = fileList.map(file => ({
                    uid: file.uid,
                    name: file.name,
                    status: 'done',
                }));
                setFileList(newFileList);
                // Update tableNames and selectedTable as needed
                setTableNames(prevNames => [...prevNames, file.name]);
                setSelectedTable(file.name);
                // No need to call `setDataSources` and `setColumns` here,
                // as they are already being updated in `handleFileRead`
            });
            return false; // Prevent actual upload
        },
        onRemove: (file) => {
            // Update fileList state
            const newFileList = fileList.filter(item => item.uid !== file.uid);
            setFileList(newFileList);
            // Remove data from dataSources and columns
            const newDataSources = { ...dataSources };
            delete newDataSources[file.name];
            setDataSources(newDataSources);
            const newColumns = { ...columns };
            delete newColumns[file.name];
            setColumns(newColumns);
            // Update tableNames and selectedTable as needed
            const newTableNames = tableNames.filter(name => name !== file.name);
            setTableNames(newTableNames);
            if (selectedTable === file.name) {
                setSelectedTable(newTableNames.length > 0 ? newTableNames[0] : '');
            }
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
                {/* <h2 className='mb-2 text-gray-500'>View</h2> */}
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