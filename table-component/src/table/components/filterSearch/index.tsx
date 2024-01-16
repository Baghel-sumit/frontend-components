import { useState } from "react";

const FilterContent = () => {
  return (
    <div>
      <div>
        <label htmlFor="attributeName">Attribute Name</label>
        <input type="text" name="attributeName" id="attributeName" />
      </div>
      <div>
        <label htmlFor="attributeNameValue">Value</label>
        <input type="text" name="attributeNameValue" id="attributeNameValue" />
      </div>
    </div>
  )
}

const FilterSearch = () => {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      {Array.from({ length: counter }).map((_, idx)=> (
        <FilterContent key={idx} />
      ))}
      <button onClick={()=> setCounter((prev)=> prev + 1)}>Add More filter</button>
    </div>
  )
}

export default FilterSearch;
