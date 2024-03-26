'use client'
import React, { useState } from 'react'
import Select from 'react-select';
import { filtersInitialState, groupObjectTemplate, allRelations } from './data';

const GroupComponent = ({ relation, conditions = [], onChangeConditionsRelation, onAddCondition, onRemoveCondition }) => {

  return (
    <div className="border border-slate-400 rounded-md w-full h-auto">
      <Select
        options={allRelations}
        value={relation}
        className='w-fit h-full px-2'
      />
      <div>
        {/* conditions cards */}
      </div>
      {/* input with select dropdown */}
    </div>
  )
}

const getArrayFromLength = (length) => Array.from({ length }).map((_, index)=> index + 1);

const Home = () => {
  const [filters, setFilters] = useState(filtersInitialState);

  const onChangeGroupRelation = (value, groupIdx) => {
    setFilters((prev) => {
      prev.groups[groupIdx] = value;
      return prev;
    });
  }

  const onAddGroup = () => {
    setFilters((prev) => {
      prev.groups.push(groupObjectTemplate);
      return prev;
    });
  }

  const onChangeRelation = (value) => {
    setFilters((prev) => {
      prev.relation = value;
      return prev;
    });
  }

  const onAddCondition = (condition, groupIdx) => {
    setFilters((prev) => {
      prev.groups[groupIdx].conditions.push(condition);
      return prev;
    });
  }

  const onRemoveCondition = (condIdx, groupIdx) => { 
    setFilters((prev) => {
      prev.groups[groupIdx].conditions.splice(condIdx, 1);
      return prev;
    });
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-start py-8 px-4'>
      {filters.groups.map((group, index)=> (
        <GroupComponent
          key={index}
          {...group}
          onChangeConditionsRelation={(value) => onChangeGroupRelation(value, index)}
          onAddCondition={(condition) => onAddCondition(condition, index)}
          onRemoveCondition={(condIdx) => onRemoveCondition(condIdx, index)}
        />
      ))}
      <div>
        <button type='button' onClick={onAddGroup}>Add Group</button>
      </div>
    </div>
  )
}

export default Home
