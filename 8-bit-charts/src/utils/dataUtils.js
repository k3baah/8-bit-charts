import Papa from 'papaparse';

export const loadCsvData = async (filename, setData, setColumnHeaders) => {
  try {
    const response = await fetch(`/data/${filename}`);
    const csvText = await response.text();
    Papa.parse(csvText, {
      complete: (results) => {
        const headers = results.meta.fields;
        setColumnHeaders(headers); // Update state with column headers

        const formattedData = results.data.map(row => {
          const rowData = {};
          headers.forEach(header => {
            rowData[header] = row[header];
          });
          return rowData;
        });
        setData(formattedData);
      },
      header: true,
    });
  } catch (err) {
    console.error('Error loading CSV:', err);
  }
};

// Add more utility functions as needed