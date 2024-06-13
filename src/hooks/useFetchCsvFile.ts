import Papa from "papaparse";

import { sanitizeColumns } from "../utils";

type CsvCallbackHandler = (data: any) => void;

const useFetchCsvFile = () => {
  const fetchCsvData = async (
    filePath: string,
    callback: CsvCallbackHandler
  ) => {
    const response = await fetch(filePath);
    const reader = response.body!.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csvString = decoder.decode(result.value!);
    const { data } = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    });
    const sanitizedData = sanitizeColumns(data);
    callback(sanitizedData);
  };

  return { fetchCsvData };
};

export default useFetchCsvFile;
