import React from 'react'
import AutoComplete from './AutoComplete'
import FilterButton from './FilterButton'

function SearchBar (props) {
  return (
    <div className='ola-search-bar'>
      <AutoComplete {...props} />
      <FilterButton />
    </div>
  )
}

module.exports = SearchBar
