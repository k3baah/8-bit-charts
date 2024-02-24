import { useEffect } from 'react';
import { loadCsvData } from '../utils/dataUtils';

export const useCsvData = (filename, setColumnHeaders) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadCsvData(filename, setData, setColumnHeaders);
  }, [filename, setColumnHeaders]);

  return data;
};