import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Table, Divider, Upload, Select, message } from 'antd';
import { parseCSV } from '../utils/csvParser'; // Adjust the import path as necessary
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
        parseCSV(file, (formattedColumns, formattedData) => {
            // Update the shared state
            setDataSources(prev => ({ ...prev, [file.name]: formattedData }));
            setColumns(prev => ({ ...prev, [file.name]: formattedColumns }));
            setTableNames(prev => [...prev, file.name]);
            if (!selectedTable) setSelectedTable(file.name);

            onSuccess();
        });
    };

    const handleSelectChange = (value) => {
        setSelectedTable(value); // Update the selected table based on the user's selection
    };

    const props = {
        name: 'file',
        multiple: true,
        fileList: fileList, // Use state fileList
        beforeUpload: (file) => {
            const isUnderSizeLimit = (file) => {
                const totalSize = fileList.reduce((acc, currentFile) => acc + currentFile.size, 0) + file.size;
                return totalSize <= 5 * 1024 * 1024;
            };
        
            if (!isUnderSizeLimit(file)) {
                message.error('Total file size must be smaller than 5MB');
                return Upload.LIST_IGNORE; // This should prevent the file from being added
            }
            // Process the file
            handleFileRead(file, () => {
                // File size check has already been done, just process the file
                const newFile = {
                    uid: file.uid,
                    name: file.name,
                    size: file.size, // Make sure to include the file size here
                    status: 'done',
                };
                setFileList(currentFileList => [...currentFileList, newFile]);
                // Note: No need to update tableNames and selectedTable here since it's done in handleFileRead
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
        <div className='my-6 mx-6'>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Max 5MB.
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
                <Table dataSource={dataSources[selectedTable]} columns={columns[selectedTable]} />
            </div>
        </div>
    );
};

export default DataConfig;