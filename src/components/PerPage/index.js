import React from 'react'
import { changePerPage, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'

const PerPage = ({ perPage, translate, dispatch }, context) => {
  let values = context.config.perPage
  return (
    <div className='ola-per-page'>
      <label className='ola-per-page-label'>{translate('per_page_label')}</label>
      <select
        defaultValue={perPage}
        className='ola-per-page-select'
        onChange={(event) => {
          dispatch(changePerPage(event.target.value))
          dispatch(executeSearch())
        }}
      >
        {values.map((value, idx) => <option key={idx}>{value}</option>)}
      </select>
    </div>
  )
}

PerPage.contextTypes = {
  config: React.PropTypes.object
}

module.exports = injectTranslate(PerPage)
