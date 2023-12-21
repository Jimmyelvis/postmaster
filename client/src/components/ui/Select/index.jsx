import React from 'react'

export const Select = ({ value, onChange, options}) => {
  return (
    <div className="selector">
      <select
        name="sort"
        id="sort"
        className="select-input"
        value={value}
        onChange={onChange}
      >
       { options.map((option) => {
        return (
          <option value={option.value}>{option.text}</option>
        )
       })}
      </select>
      <div class="custom-arrow"></div>
    </div>
  );
}
