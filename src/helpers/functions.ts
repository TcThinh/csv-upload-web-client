import { Estate } from "../types/estate";
import { ESTATE_DOCUMENT_HEADER } from "./constants";

export const checkEstateDocument = (
  estateHeadersParam: string[]
): [boolean, string] => {
  //remove empty element
  let estateHeaders = estateHeadersParam.filter((es) => es);
  const estateDocumentHeaderLength = ESTATE_DOCUMENT_HEADER.length;
  console.log(estateDocumentHeaderLength);
  console.log(estateHeaders.length);

  // slice redundant column
  if (estateHeaders.length > estateDocumentHeaderLength) {
    estateHeaders = estateHeaders.slice(0, estateDocumentHeaderLength);
    for (let i = 0; i < estateHeaders.length; i++) {
      if (estateHeaders[i] !== ESTATE_DOCUMENT_HEADER[i])
        return [
          false,
          `Header ${estateHeaders[i]} is invalid, this position should be ${ESTATE_DOCUMENT_HEADER[i]}, please check again `,
        ];
    }
  }

  // check column is valid
  for (let i = 0; i < estateHeaders.length; i++) {
    const headerName = estateHeaders[i];
    if (!ESTATE_DOCUMENT_HEADER.includes(headerName))
      return [false, `Header ${headerName} is invalid, please check again`];
  }

  // check missing column
  const missingHeaderNameList = [];

  for (let i = 0; i < estateDocumentHeaderLength; i++) {
    const headerName = ESTATE_DOCUMENT_HEADER[i];

    if (!estateHeaders.includes(headerName))
      missingHeaderNameList.push(headerName);
  }

  if (missingHeaderNameList.length > 0)
    return [
      false,
      `Missing header columns: ${missingHeaderNameList.map((c) => ` ${c}`)}`,
    ];

  return [true, ""];
};

// remove emply line and header
export const transformEstateDocument = (estatesRawData: any): Estate[] => {
  // included header
  if (estatesRawData.length < 0) return [];
  let estatesRawDataClone = [...estatesRawData];

  console.log("joinn");

  console.log(estatesRawDataClone[1].join().replaceAll(",", "") === "");

  estatesRawDataClone.splice(0, 1);

  // remove empty row if needed
  estatesRawDataClone = estatesRawDataClone.filter(
    (e) => e.join().replaceAll(",", "") !== ""
  );

  return estatesRawDataClone.map((e) => mapArrayToEstate(e));
};

export const mapArrayToEstate = ([
  propertyType,
  streetAddress,
  cityName,
  stateOrProvince,
  postalCode,
  listingPrice,
  numberOfBedrooms,
  numberOfBathrooms,
  generalLocation,
  squareFootage,
  lotArea,
  yearConstructed,
  daysListedOnMarket,
  pricePerSquareFoot,
  mlsIdentifier,
  latitude,
  longitude,
]: string[]): Estate => {
  return {
    propertyType,
    streetAddress,
    cityName,
    stateOrProvince,
    postalCode,
    listingPrice,
    numberOfBedrooms,
    numberOfBathrooms,
    generalLocation,
    squareFootage,
    lotArea,
    yearConstructed,
    daysListedOnMarket,
    pricePerSquareFoot,
    mlsIdentifier,
    latitude,
    longitude,
  };
};
