import React from 'react'
import AutoComplete from './AutoComplete'
import FilterButton from './FilterButton'
import LayoutButton from './LayoutButton'

function SearchBar (props) {
  return (
    <div className='ola-search-bar-wrapper'>
      <div className='ola-search-bar'>
        <AutoComplete {...props} />
        <FilterButton />
        <LayoutButton />
      </div>
    </div>
  )
}

module.exports = SearchBar
