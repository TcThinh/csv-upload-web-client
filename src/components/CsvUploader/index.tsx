import { useEffect, useState } from "react";
import useFetchCsvFile from "../../hooks/useFetchCsvFile";

const CsvUploader = () => {
  const [data, setData] = useState<any[]>([]);
  const { fetchCsvData } = useFetchCsvFile();

  useEffect(() => {}, []);

  return <div>CsvUploader</div>;
};

export default CsvUploader;
