import { ChangeEvent, useState } from "react";
import FilterSearch from "./components/filterSearch";
import SearchInput from "./components/searchInput/searchInput";
import { PageSizeDd, TableProps } from "./interfaces";
import './styles.css';

const voidFunc = ()=> {};

// const pages = ['1', '2', '3', '4', '5'];
const activePage = '2';
const defaultPageSizeDdItems = [
  { value: 10, label: '10 items', isActive: true, isDefault: true },
  { value: 20, label: '20 items' },
  { value: 30, label: '30 items' },
  { value: 40, label: '40 items' },
];
const defaultPageSizeDdLabel = 'Size: ';

const TableComponent = (props: TableProps) => {
  const [selectedPageSize, setSelectedPageSize] = useState<PageSizeDd>(props.pageSizeDdItems?.length ? props.pageSizeDdItems[0] : defaultPageSizeDdItems[0]);
  const requiredPagesCount = Math.ceil((props.data.length / Number(selectedPageSize?.value)));
  const pages = Array.from({ length: requiredPagesCount }).map((_, idx)=> (idx + 1).toString());

  const performSorting = (columnKey: string | number) => {
    console.log(columnKey);
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const value = Number(target.value);
    if (props.pageSizeDdItems?.length) {
      setSelectedPageSize(props.pageSizeDdItems?.find((item)=> item.value === value) || props.pageSizeDdItems[0]);
    } else {
      setSelectedPageSize(defaultPageSizeDdItems.find((item)=> item.value === value) || defaultPageSizeDdItems[0]);
    }
  }

  return (
    <div className={`table-component ${props.className || ''}`}>
      <div className="table-topSection">
        {!(props.isFilterSearch || props.isSearchInput) ? null : (
          <div className="table-search">
            {!props.isSearchInput ? null : <SearchInput />}
            {!props.isFilterSearch ? null : <FilterSearch />}
          </div>
        )}
        {!props.isPageSizeDd ? null : (
          <div className="table-row-dd">
            <label htmlFor="size-dd">{props.pageSizeDdLabel || defaultPageSizeDdLabel}</label>
            <select name="size" id="size-dd" value={selectedPageSize.value} onChange={handlePageSizeChange}>
            {(props.pageSizeDdItems || defaultPageSizeDdItems).map((item)=> (
              <option key={item.value} value={item.value} selected={item.isActive || item.isDefault || false}>{item.label}</option>
            ))}
            </select>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            {props.columns?.map((item)=> (
              <th key={item.key} className={item.className} onClick={!item.isSorting ? voidFunc : ()=> performSorting(item.key)}>
                <span>{item.value}</span>
                {!item.isSorting ? null : (
                  <>
                    <span>&uarr;</span>
                    <span>&darr;</span>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data?.map((columnData, idx)=> {
            return (
              <tr key={idx}>
                {props.columns.map((column)=> {
                  const renderedContent = column?.render ? column.render() : columnData[column.key]
                  return (
                    <td key={column.key} className={column.className}>{renderedContent}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="table-bottomSection">
        {!props.isCustomPagination ? null : (
          <div className="custom-pagination"> 
            <a href="#">❮</a>
            <a href="#">❯</a>
          </div>
        )}
        {!props.isDefaultPagination ? null : (
          <div className="default-pagination">
            <a href="#">&laquo;</a>
            {pages.map((item)=> (
              <a href="#" key={item} className={`${activePage === item ? 'active' : ''}`}>{item}</a>
            ))}
            <a href="#">&raquo;</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableComponent
