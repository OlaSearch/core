import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { addFacet, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/injectTranslate'

function AnswerToken (
  {
    answer,
    addFacet,
    totalResults,
    executeSearch,
    facets,
    facetQuery,
    translate
  },
  { config }
) {
  if (!answer || !answer.search || !totalResults) return null
  /* Remove slots that have been already added */
  let slots = answer.search.slots.filter(({ name, value }) => {
    return !facetQuery.some(
      ({ name: _name, selected }) =>
        _name === name && selected.indexOf(value) !== -1
    )
  })

  slots = slots.filter(({ name, value }) => {
    let facet = facets.filter(({ name: _name }) => _name === name)
    if (!facet.length) return false
    facet = facet.reduce((a, _) => a)
    /* Check if value exists */
    return facet.values.some((item) => item.name === value)
  })

  /* If no slots hide */
  if (!slots.length) return null
  function handleAddToken (name, value) {
    let facet = find(propEq('name', name))(config.facets)
    addFacet(facet, value)
    executeSearch()
  }

  /**
   * 1. Check if facet exists
   * 2. Check if value exists in the facet
   */
  return (
    <div className='ola-answer-slots'>
      <span className='ola-answer-slots-text'>
        {translate('filter_suggestions')}
      </span>
      {slots.map(({ name, value }, idx) => {
        let facet = facets
          .filter(({ name: _name }) => _name === name)
          .reduce((a, _) => a)

        let displayName = facet ? facet.displayName : name
        return (
          <AnswerTokenBtn
            key={`${idx}_${name}`}
            name={name}
            value={value}
            handleAddToken={handleAddToken}
            displayName={displayName}
          />
        )
      })}
    </div>
  )
}

AnswerToken.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

function AnswerTokenBtn ({ name, value, displayName, handleAddToken }) {
  function handleAdd () {
    handleAddToken(name, value)
  }
  return (
    <button className='ola-btn ola-btn-slot-add' onClick={handleAdd}>
      {displayName}: {value}
    </button>
  )
}

AnswerToken.defaultProps = {
  answer: null
}

function mapStateToProps (state) {
  return {
    answer: state.AppState.answer,
    facets: state.AppState.facets,
    facetQuery: state.QueryState.facet_query,
    totalResults: state.AppState.totalResults
  }
}

module.exports = connect(mapStateToProps, { addFacet, executeSearch })(
  injectTranslate(AnswerToken)
)
