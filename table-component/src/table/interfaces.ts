import { ReactNode } from "react";

interface FilterSelectDdValues {
  key: string,
  value: string,
  label: string,
}

export interface FilterSelectDdProps {
  label: string,
  values: Array<FilterSelectDdValues>,
  id: string,
  isStringArray: boolean
}

export interface PageSizeDd {
  value: string | number,
  label: string,
  isActive?: boolean, 
  isDefault?: boolean,
  className?: string,
}

interface Column {
  value: string | number;
  isSorting: boolean;
  render?: () => ReactNode;
  className: string;
  key: string | number;
  dataType: string | number;
}

interface ColumnData {
  [key: string]: string | number
}

export interface TableProps {
  isCustomPagination?: boolean,
  isDefaultPagination?: boolean,
  isPageSizeDd?: boolean,
  isFilterSearch?: boolean,
  isSearchInput?: boolean,
  pageSizeDdLabel?: string,
  pageSizeDdItems?: Array<PageSizeDd>,
  columns: Array<Column>,
  className?: string,
  data: Array<ColumnData>
}