import { ChangeEvent, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import PapaParse from "papaparse";

import "./CsvUploader.css";
import Loading from "../Loading";
import { estateColumns } from "../../helpers/dataColumns";
import { Estate } from "../../types/estate";
import {
  checkEstateDocument,
  transformEstateDocument,
} from "../../helpers/functions";

const CsvUploader = () => {
  const [estates, setEstates] = useState<Estate[] | undefined>([]);
  const [verifyDocumentMessage, setVerifyDocumentMessage] = useState("");
  const reader = useRef(new window.FileReader());

  const readFile = (file: File) => {
    const encoding: string = "utf-8";
    const options = {
      skipEmptyLines: true,
    };
    reader.current.onload = (loadEvent: ProgressEvent<FileReader>) => {
      const content = loadEvent.target?.result;
      const parsedContent =
        typeof content === "string" ? PapaParse.parse(content, options) : null;

      if (parsedContent && parsedContent.data) {
        const estatesDataRaw = parsedContent.data;

        const [isValid, message] = checkEstateDocument(
          estatesDataRaw[0] as string[]
        );

        if (isValid) {
          const transformedData = transformEstateDocument(estatesDataRaw);
          setEstates(transformedData);
        }

        setVerifyDocumentMessage(message);
      }
    };
    if (file) reader.current.readAsText(file, encoding);
  };

  const onFileChange = (fileChangeEvent: ChangeEvent<HTMLInputElement>) => {
    if (fileChangeEvent.target.files) {
      const selectedFile = fileChangeEvent.target.files[0];
      readFile(selectedFile);
    }
  };

  return (
    <>
      <div style={{}}>
        <div className="message">{verifyDocumentMessage}</div>

        <h1>Upload or whatever</h1>
        <div className="buttons-wrapper">
          <input
            id="file-choose-input"
            type="file"
            accept=".csv"
            onChange={onFileChange}
            className="input-choose-file"
          />

          <label className="button" htmlFor="file-choose-input">
            Choose a file
          </label>

          <label className="button">Upload data</label>
        </div>
      </div>

      <div className="table-wrapper">
        {/* <Loading /> */}
        <DataTable
          columns={estateColumns}
          data={estates as Estate[]}
          highlightOnHover
          pagination
          striped={true}
          progressComponent={<Loading />}
          noDataComponent={<div>No record</div>}
          className="table"
        />
      </div>
    </>
  );
};

export default CsvUploader;
