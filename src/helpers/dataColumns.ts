import { TableColumn } from "react-data-table-component";
import { Estate } from "../types/estate";

export const estateColumns: TableColumn<Estate>[] = [
  {
    name: "PROPERTY TYPE",
    selector: (es: Estate) => es.propertyType,
  },
  {
    name: "ADDRESS",
    selector: (es: Estate) => es.streetAddress,
  },
  {
    name: "CITY",
    selector: (es: Estate) => es.cityName,
  },
  {
    name: "STATE OR PROVINCE",
    selector: (es: Estate) => es.stateOrProvince,
  },
  {
    name: "ZIP OR POSTAL CODE",
    selector: (es: Estate) => es.postalCode,
  },
  {
    name: "PRICE",
    selector: (es: Estate) => es.listingPrice,
  },
  {
    name: "BEDS",
    selector: (es: Estate) => es.numberOfBedrooms,
  },
  {
    name: "BATHS",
    selector: (es: Estate) => es.numberOfBathrooms,
  },
  {
    name: "LOCATION",
    selector: (es: Estate) => es.generalLocation,
  },
  {
    name: "SQUARE FEET",
    selector: (es: Estate) => es.squareFootage,
  },
  {
    name: "LOT SIZE",
    selector: (es: Estate) => es.lotArea,
  },
  {
    name: "YEAR BUILT",
    selector: (es: Estate) => es.yearConstructed,
  },
  {
    name: "DAYS ON MARKET",
    selector: (es: Estate) => es.daysListedOnMarket,
  },
  {
    name: "$/SQUARE FEET",
    selector: (es: Estate) => es.pricePerSquareFoot,
  },
  {
    name: "MLS#",
    selector: (es: Estate) => es.mlsIdentifier,
  },
  {
    name: "LATITUDE",
    selector: (es: Estate) => es.latitude,
  },
  {
    name: "LONGITUDE",
    selector: (es: Estate) => es.longitude,
  },
];
