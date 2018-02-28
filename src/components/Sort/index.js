import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeSort, executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import ChevronDown from '@olasearch/icons/lib/chevron-down'

function Sort ({ selected, translate, changeSort, executeSearch }, { config }) {
  function handleChange (event) {
    changeSort(event.target.value)
    executeSearch()
  }
  let { sortBy } = config
  /* Do not display if there are no sort options */
  if (!sortBy.length) return null
  return (
    <div className='ola-sort'>
      <label className='ola-sort-label' htmlFor='Ola-Element-Sort'>
        {translate('sort_label')}{' '}
      </label>
      <div className='ola-sort-select-wrap'>
        <select
          className='ola-sort-select'
          value={selected}
          onChange={handleChange}
          id='Ola-Element-Sort'
        >
          <option value=''>Relevancy</option>
          {sortBy.map((sort, idx) => (
            <option key={idx} value={sort.value}>
              {sort.name}
            </option>
          ))}
        </select>
        <ChevronDown />
      </div>
    </div>
  )
}

Sort.propTypes = {
  selected: PropTypes.string.isRequired
}

Sort.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

function mapStateToProps (state) {
  return {
    selected: state.QueryState.sort
  }
}

module.exports = connect(mapStateToProps, { changeSort, executeSearch })(
  withTranslate(Sort)
)
