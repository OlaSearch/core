import React from 'react'

const FilterInput = ({ placeholder = '', value, onChange }) => {
  return (
    <input
      type='text'
      className='ola-text-input ola-facet-filter-input'
      value={value}
      placeholder={placeholder}
      aria-label='Input'
      onChange={onChange}
    />
  )
}

export default FilterInput
