import Papa from 'papaparse';

export const parseCSV = (file, onSuccess) => {
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
              if (valueA === undefined && valueB === undefined) {
                return 0;
              }
              if (valueA === undefined) {
                return -1;
              }
              if (valueB === undefined) {
                return 1;
              }
              if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                return Number(valueA) - Number(valueB);
              }
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
        onSuccess(formattedColumns, formattedData);
      }
    },
    header: false,
  });
};