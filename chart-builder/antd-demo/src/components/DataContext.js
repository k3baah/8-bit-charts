import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext({
    dataSources: {}, // Initialize with an empty object or suitable default
    setDataSources: () => {},
    // Initialize other properties similarly
  });

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
    const [selectedKey, setSelectedKey] = useState(() => {
        const localSelectedKey = localStorage.getItem('selectedKey');
        return localSelectedKey || '';
    });
    
    const [selectedValues, setSelectedValues] = useState(() => {
        const localSelectedValues = localStorage.getItem('selectedValues');
        return localSelectedValues ? JSON.parse(localSelectedValues) : [];
    });

    console.log("selected key", selectedKey)
    console.log("selected values", selectedValues)

    // Effect to sync state with localStorage
    useEffect(() => {
        console.log("Current dataSources:", dataSources);
        console.log("Current selectedTable:", selectedTable);
        try {
            localStorage.setItem('dataSources', JSON.stringify(dataSources));
            localStorage.setItem('columns', JSON.stringify(columns));
            localStorage.setItem('tableNames', JSON.stringify(tableNames));
            localStorage.setItem('selectedTable', selectedTable);
            localStorage.setItem('fileList', JSON.stringify(fileList));
        } catch (error) {
            if (error instanceof DOMException && error.code === 22) {
                // DOMException 22 is the error code for QuotaExceededError in most browsers
                // message.error('Local storage limit exceeded. Please remove some items.');
            } else {
                console.error('Failed to save to localStorage:', error);
            }
        }
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
        selectedKey,
        setSelectedKey,
        selectedValues,
        setSelectedValues,
    };


    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the DataContext
export const useData = () => useContext(DataContext);