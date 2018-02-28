import React from 'react'
import AutoComplete from './AutoComplete'
import InstantSearchForm from './InstantSearchForm'
import FilterButton from './FilterButton'
import LayoutButton from './LayoutButton'

function SearchBar ({ instant, ...props }) {
  return (
    <div className='ola-search-bar-wrapper'>
      <div className='ola-search-bar'>
        {instant ? <InstantSearchForm /> : <AutoComplete {...props} />}
        <FilterButton />
        <LayoutButton />
      </div>
    </div>
  )
}

module.exports = SearchBar
