import React, { ChangeEvent, useState } from "react";
import SearchInput from "./components/searchInput/searchInput";
import { Column, ColumnData, PageSizeDd, SortColumnData, TableProps } from "./interfaces";
import styles from './styles.module.css';
import { groupDataByPage } from "./utils/group-data";
import { defaultPageSizeDdItems, defaultPageSizeDdLabel, voidFunc } from "./table-data";

const TableComponent: React.FC<TableProps> = ({ 
  columns, 
  data, 
  searchInput, 
  className, 
  isCustomPagination, 
  isDefaultPagination, 
  isPageSizeDd, 
  isSearchInput, 
  pageSizeDdItems, 
  pageSizeDdLabel,
  classNamePrefix,
  onClickBack,
  onClickForward
}) => {
  const [selectedPageSize, setSelectedPageSize] = useState<PageSizeDd>(pageSizeDdItems?.length ? pageSizeDdItems[0] : defaultPageSizeDdItems[0]);
  const requiredPagesCount = Math.ceil((data.length / Number(selectedPageSize?.value)));
  const pages = Array.from({ length: requiredPagesCount }).map((_, idx)=> (idx + 1));
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [sortColumn, setSortColumn] = useState<SortColumnData>();

  const performSorting = (item : Column, idx: number) => {
    if (idx === sortColumn?.idx) {
      setSortColumn({ idx, item, order: sortColumn.order === 'asd' ? 'dsd' : 'asd' });
    } else {
      setSortColumn({ idx, item, order: "asd" });
    }
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const value = Number(target.value);
    if (pageSizeDdItems?.length) {
      setSelectedPageSize(pageSizeDdItems?.find((item)=> item.value === value) || pageSizeDdItems[0]);
    } else {
      setSelectedPageSize(defaultPageSizeDdItems.find((item)=> item.value === value) || defaultPageSizeDdItems[0]);
    }
  }

  const modifiedData = groupDataByPage(data, selectedPageSize.value);

  const goToBack = () => {
    setSelectedPage((prev)=> {
      if (prev === 1) return prev;
      return prev - 1;
    })
  }

  const goToForward = () => {
    setSelectedPage((prev)=> {
      if (prev === requiredPagesCount) return prev;
      return prev + 1;
    })
  }

  const applySorting = (itemA: ColumnData, itemB: ColumnData) => {
    if (typeof(sortColumn?.item.key) === 'string') {
      const cond = itemA[sortColumn.item.key].toString().length > itemB[sortColumn.item.key].toString().length;
      return sortColumn.order === 'asd' ? cond ? 1 : -1 : cond ? -1 : 1; 
    } else if (typeof(sortColumn?.item.key) === 'number') {
      const cond = itemA[sortColumn.item.key] > itemB[sortColumn.item.key];
      return sortColumn.order === 'asd' ? cond ? 1 : -1 : cond ? -1 : 1;
    }

    return sortColumn?.order === 'asd' ? 1 : -1;
  }

  return (
    <div className={`${classNamePrefix ? classNamePrefix + '-table-component' : ''} ${className || ''}`}>
      <div className={`${classNamePrefix ? classNamePrefix + '-table-topSection' : ''}`}>
        {!(isSearchInput) ? null : (
          <div className={`${classNamePrefix ? classNamePrefix + '-table-searchSection' : ''}`}>
            {!isSearchInput ? null : <SearchInput {...searchInput} />}
          </div>
        )}
        {!isPageSizeDd ? null : (
          <div className={`${classNamePrefix ? classNamePrefix + '-table-row-dd' : ''}`}>
            <label htmlFor={`${classNamePrefix ? classNamePrefix + '-size-dd' : ''}`}>{pageSizeDdLabel || defaultPageSizeDdLabel}</label>
            <select name="size" id="size-dd" value={selectedPageSize.value} onChange={handlePageSizeChange}>
            {(pageSizeDdItems || defaultPageSizeDdItems).map((item)=> (
              <option key={item.value} value={item.value} selected={item.isActive || item.isDefault || false}>{item.label}</option>
            ))}
            </select>
          </div>
        )}
      </div>
      <table className={`${styles.table} ${classNamePrefix ? classNamePrefix + '-table-tag' : ''}`}>
        <thead>
          <tr>
            {columns?.map((item, index)=> (
              <th key={item.key} className={`${styles.th} ${item?.className || ''}`} onClick={!item.isSorting ? voidFunc : ()=> performSorting(item, index)}>
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
          {!modifiedData[selectedPage.toString()] ? null : (sortColumn && sortColumn.idx !== -1 ? modifiedData[selectedPage.toString()].sort(applySorting) : modifiedData[selectedPage.toString()]).map((columnData, idx)=> {
            return (
              <tr key={idx}>
                {columns.map((column)=> {
                  const renderedContent = column?.render ? column.render() : columnData[column.key]
                  return (
                    <td key={column.key} className={`${styles.table} ${column?.className || ''}`}>{renderedContent}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={`${classNamePrefix ? classNamePrefix + '-table-bottomSection' : ''}`}>
        {!isCustomPagination ? null : (
          <div className={`${classNamePrefix ? classNamePrefix + '-custom-pagination' : ''} ${styles['custom-pagination']}`}> 
            <span className={`${classNamePrefix ? classNamePrefix + '-cp-back-btn' : ''} ${styles['cp-back-btn']}`} onClick={onClickBack}>❮</span>
            <span className={`${classNamePrefix ? classNamePrefix + '-cp-forward-btn' : ''} ${styles['cp-forward-btn']}`} onClick={onClickForward}>❯</span>
          </div>
        )}
        {!isDefaultPagination ? null : (
          <div className={`${classNamePrefix ? classNamePrefix + '-default-pagination' : ''} ${styles['default-pagination']}`}>
            <div 
              onClick={goToBack} 
              className={`
                ${styles['dp-back-btn']}
                ${classNamePrefix ? classNamePrefix + '-dp-back-btn' : ''} 
                ${selectedPage === 1 ? classNamePrefix ? classNamePrefix + '-dp-back-btn--disabled' : styles['dp-back-btn--disabled'] : ''}
              `}
            >
              &laquo;
            </div>

            {pages.map((item)=> (
              <span 
                key={item} 
                onClick={()=> setSelectedPage(item)} 
                className={`
                  ${styles['page-count']}
                  ${selectedPage === item ? 'active' : ''}
                `}
              >
                {item}
              </span>
            ))}

            <div 
              onClick={goToForward} 
              className={`
                ${styles['dp-forward-btn']}
                ${classNamePrefix ? classNamePrefix + '-dp-forward-btn' : ''}
                ${selectedPage === requiredPagesCount ? classNamePrefix ? classNamePrefix + '-dp-forward-btn--disabled' : styles['dp-forward-btn--disabled'] : ''}
              `}
            >
              &raquo;
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableComponent
