import React from 'react';
import { searchInputProps } from '../../interfaces';
import './search-input.css';

const SearchInput: React.FC<searchInputProps> = ({ className, value, onChange }) => {
  return (
    <div className={`constrain ${className || ''}`}>
      <input className="input-grey-rounded" value={value} onChange={onChange} type="text" placeholder="Search"/>
    </div>
  )
}

export default SearchInput
