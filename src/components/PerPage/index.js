import React from 'react'
import PropTypes from 'prop-types'
import { changePerPage, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'

function PerPage ({ perPage, translate, dispatch }, context) {
  let values = context.config.perPage

  function onChange (event) {
    dispatch(changePerPage(event.target.value))
    dispatch(executeSearch())
  }

  return (
    <div className='ola-per-page'>
      <label className='ola-per-page-label'>
        {translate('per_page_label')}
      </label>
      <select
        defaultValue={perPage}
        className='ola-per-page-select'
        onChange={onChange}
      >
        {values.map((value, idx) => <option key={idx}>{value}</option>)}
      </select>
    </div>
  )
}

PerPage.contextTypes = {
  config: PropTypes.object
}

module.exports = injectTranslate(PerPage)
