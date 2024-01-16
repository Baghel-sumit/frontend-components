import './App.css'
import TableComponent from './table'
import { columnsData, columnsDetails } from './data';

const App = () => {

  return (
    <div className="app-container">
      <TableComponent
        isDefaultPagination
        isSearchInput
        isFilterSearch
        columns={columnsDetails}
        data={columnsData}
      />
    </div>
  )
}

export default App
