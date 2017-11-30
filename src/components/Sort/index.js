import React from 'react'
import PropTypes from 'prop-types'
import { changeSort, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'

function Sort (props, context) {
  function handleChange (event) {
    let { dispatch } = props
    dispatch(changeSort(event.target.value))
    dispatch(executeSearch())
  }
  let { sortBy } = context.config
  let { selected, translate } = props

  return (
    <div className='ola-sort'>
      <label>{translate('sort_label')} </label>
      <select
        className='ola-sort-select'
        value={selected}
        onChange={handleChange}
      >
        <option value=''>Relevance</option>
        {sortBy.map((sort, idx) => (
          <option key={idx} value={sort.value}>
            {sort.name}
          </option>
        ))}
      </select>
    </div>
  )
}

Sort.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

Sort.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

module.exports = injectTranslate(Sort)
