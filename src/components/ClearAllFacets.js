import React from 'react'
import { removeAllFacets, executeSearch } from './../actions/Search'
import injectTranslate from './../decorators/OlaTranslate'

function ClearAllFacets ({ selected, dispatch, translate }) {
  function handleClick () {
    dispatch(removeAllFacets())
    dispatch(executeSearch())
  }
  if (!selected.length) return null
  return (
    <button
      type='button'
      className='ola-link-clear-all-filters'
      onClick={handleClick}
    >{translate('clear_all_filters')}</button>
  )
}

module.exports = injectTranslate(ClearAllFacets)
