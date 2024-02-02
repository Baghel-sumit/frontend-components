import { ChangeEvent, ReactNode } from "react";

type FilterSelectDdValues = {
  key: string,
  value: string,
  label: string,
}

export type SortColumnData = {
  idx: number,
  item: Column,
  order: 'asd' | 'dsd'
}

export type FilterSelectDdProps = {
  label: string,
  values: Array<FilterSelectDdValues>,
  id: string,
  isStringArray: boolean
}

export type PageSizeDd = {
  value: number,
  label: string,
  isActive?: boolean, 
  isDefault?: boolean,
  className?: string,
}

export type searchInputProps = {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export type Column = {
  value: string | number;
  isSorting: boolean;
  render?: () => ReactNode;
  className: string;
  key: string | number;
  dataType: string | number;
}

export type ColumnData = {
  [key: string]: string | number
}

export type TableProps = {
  isCustomPagination?: boolean,
  isDefaultPagination?: boolean,
  isPageSizeDd?: boolean,
  isFilterSearch?: boolean,
  isSearchInput?: boolean,
  pageSizeDdLabel?: string,
  pageSizeDdItems?: Array<PageSizeDd>,
  columns: Array<Column>,
  className?: string,
  data: Array<ColumnData>,
  searchInput: searchInputProps,
  classNamePrefix?: string,
  onClickBack?: () => void,
  onClickForward?: () => void
}