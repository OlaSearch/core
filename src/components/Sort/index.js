import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeSort, executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import SelectBox from './../SelectBox'

/**
 * Show result sorting select box
 */
function Sort ({ selected = '', translate, changeSort, executeSearch, config }) {
  function handleChange (event) {
    changeSort(event.target.value)
    executeSearch()
  }
  const { sortBy } = config
  /* Do not display if there are no sort options */
  if (!sortBy || !sortBy.length) return null
  return (
    <div className='ola-sort'>
      <SelectBox
        label={translate('sort_label')}
        onChange={handleChange}
        value={selected}
        inline
      >
        <option value=''>Relevancy</option>
        {sortBy.map(({ name, value, direction }, idx) => (
          <option
            key={idx}
            value={`${value}${direction ? ` ${direction}` : ''}`}
          >
            {name}
          </option>
        ))}
      </SelectBox>
    </div>
  )
}

Sort.propTypes = {
  /**
   * Active sort
   */
  selected: PropTypes.string
}

function mapStateToProps (state) {
  return {
    selected: state.QueryState.sort
  }
}

export default connect(mapStateToProps, { changeSort, executeSearch })(
  withConfig(withTranslate(Sort))
)
