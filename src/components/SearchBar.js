import React from 'react'
import AutoComplete from './AutoComplete'
import InstantSearchForm from './InstantSearchForm'
import FilterButton from './FilterButton'
import LayoutButton from './LayoutButton'
import withConfig from './../decorators/withConfig'

function SearchBar ({ instantSearch, config, ...props }) {
  return (
    <div className='ola-search-bar-wrapper'>
      <div className='ola-search-bar'>
        {instantSearch ? (
          <InstantSearchForm {...props} />
        ) : (
          <AutoComplete {...props} />
        )}
        {config.hideToggleSidebar ? null : <FilterButton />}
        {config.layoutSwitching ? <LayoutButton /> : null}
      </div>
    </div>
  )
}

SearchBar.defaultProps = {
  /**
   * Show help on what kind of queries to enter
   * @type {Boolean}
   */
  showHelp: true,
  /**
   * Add query alert
   * @type {Boolean}
   */
  showAlert: false,
  /**
   * Enable facet suggestions
   */
  wordSuggestion: false
}

module.exports = withConfig(SearchBar)
