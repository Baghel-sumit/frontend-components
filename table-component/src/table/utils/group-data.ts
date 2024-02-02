import { ColumnData } from "../interfaces";

type GroupedData = { [key: string]: ColumnData[] };

export const groupDataByPage = (data: ColumnData[], itemsPerPage: number): GroupedData => {
  const groupedData: GroupedData = {};

  data.forEach((item: ColumnData, index) => {
    const pageNumber = Math.floor(index / itemsPerPage) + 1;
    
    const pageNumberKey = String(pageNumber);

    if (!groupedData[pageNumberKey]) {
      groupedData[pageNumberKey] = [];
    }

    groupedData[pageNumberKey].push(item);
  });

  return groupedData;
};