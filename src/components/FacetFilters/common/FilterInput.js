import React from 'react'

const FilterInput = ({ placeholder = '', filterText, onChange }) => {
  return (
    <input
      type='text'
      className='ola-text-input ola-facet-filter-input'
      value={filterText}
      placeholder={placeholder}
      arial-label='Input'
      onChange={onChange}
    />
  )
}

module.exports = FilterInput
