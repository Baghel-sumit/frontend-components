import './App.css'
import TableComponent from './table'
import { columnsData, columnsDetails } from './data';
import { ChangeEvent, useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const modifiedColumnData = search ? columnsData.filter((item)=> {
    if (Object.values(item).find((item)=> item.toString().toLowerCase().includes(search.toLowerCase()))) {
      return item;
    }
  }) : columnsData;

  return (
    <div className="app-container">
      <TableComponent
        isDefaultPagination
        isSearchInput
        isFilterSearch
        isPageSizeDd
        columns={columnsDetails}
        data={modifiedColumnData}
        searchInput={{ 
          className: 'table-input', 
          value: search, 
          onChange: handleSearchInput, 
        }}
        classNamePrefix='tc-b'
      />
    </div>
  )
}

export default App
