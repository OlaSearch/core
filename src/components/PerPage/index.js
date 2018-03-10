import React from 'react'
import PropTypes from 'prop-types'
import { changePerPage, executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'

function PerPage ({ perPage, translate, dispatch, config }) {
  let values = config.perPage

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

module.exports = withConfig(withTranslate(PerPage))
