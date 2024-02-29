import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context
const DataContext = createContext();

// Provider Component
export const DataProvider = ({ children }) => {
    // State for managing uploaded data
    const [dataSources, setDataSources] = useState(() => {
        const localData = localStorage.getItem('dataSources');
        return localData ? JSON.parse(localData) : {};
    });
    const [columns, setColumns] = useState(() => {
        const localColumns = localStorage.getItem('columns');
        return localColumns ? JSON.parse(localColumns) : {};
    });
    const [tableNames, setTableNames] = useState(() => {
        const localTableNames = localStorage.getItem('tableNames');
        return localTableNames ? JSON.parse(localTableNames) : [];
    });
    const [selectedTable, setSelectedTable] = useState(() => {
        const localSelectedTable = localStorage.getItem('selectedTable');
        return localSelectedTable || '';
    });
    const [fileList, setFileList] = useState(() => {
        const localFileList = localStorage.getItem('fileList');
        return localFileList ? JSON.parse(localFileList) : [];
    });

    // Effect to sync state with localStorage
    useEffect(() => {
        localStorage.setItem('dataSources', JSON.stringify(dataSources));
        localStorage.setItem('columns', JSON.stringify(columns));
        localStorage.setItem('tableNames', JSON.stringify(tableNames));
        localStorage.setItem('selectedTable', selectedTable);
        localStorage.setItem('fileList', JSON.stringify(fileList));
    }, [dataSources, columns, tableNames, selectedTable, fileList]);

    // The value that will be given to the context
    const value = {
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
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the DataContext
export const useData = () => useContext(DataContext);