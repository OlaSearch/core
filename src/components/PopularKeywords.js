import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'
import withConfig from './../decorators/withConfig'
import { connect } from 'react-redux'
import { updateQueryTerm, executeSearch } from './../actions/Search'

function PopularKeywords ({
  translate,
  config,
  updateQueryTerm,
  executeSearch
}) {
  let { popularKeywords } = config
  if (!popularKeywords || !popularKeywords.length) return null
  function handleClick (keyword) {
    updateQueryTerm(keyword)
    executeSearch()
  }
  return (
    <div className='ola-popular-keywords'>
      <span className='ola-popular-label'>{translate('popular_keywords')}</span>
      {popularKeywords.map((keyword, idx) => (
        <KeywordItem keyword={keyword} onClick={handleClick} key={idx} />
      ))}
    </div>
  )
}
/**
 * Item
 */
function KeywordItem ({ keyword, onClick }) {
  function handleClick () {
    onClick(keyword)
  }
  return (
    <div className='ola-popular-keyword'>
      <a onClick={handleClick}>{keyword}</a>
    </div>
  )
}

module.exports = connect(null, { updateQueryTerm, executeSearch })(
  withConfig(withTranslate(PopularKeywords))
)
