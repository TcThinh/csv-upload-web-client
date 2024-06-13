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
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

        const [isValid, msg] = checkEstateDocument(
          estatesDataRaw[0] as string[]
        );

        if (isValid) {
          const transformedData = transformEstateDocument(estatesDataRaw);
          setEstates(transformedData);
        }

        setMessage(msg);
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

  const handleUploadAction = () => {
    if (!estates) {
      setMessage("Upload csv file to get data");
      return;
    }
    setIsLoading(true);
    fetch("http://localhost:3000/estates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estates }),
    })
      .then((response) => {
        if (response.status !== 200) {
          setMessage("Something went wrong");
        }
        return response.json();
      })
      .then(() => {
        setIsLoading(false);
        alert("Data saved");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Request error");
      });
  };

  return (
    <>
      <div style={{}}>
        <div className="message">{message}</div>

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

          <button
            className="button"
            onClick={() => handleUploadAction()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Upload data"}
          </button>
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
