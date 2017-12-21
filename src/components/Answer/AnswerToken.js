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
  /* Remove tokens that have been already added */
  const tokens = answer.search.tokens.filter(({ name, value }) => {
    return !facetQuery.some(
      ({ name: _name, selected }) =>
        _name === name && selected.indexOf(value) !== -1
    )
  })

  /* If no tokens hide */
  if (!tokens.length) return null
  function handleAddToken (name, value) {
    let facet = find(propEq('name', name))(config.facets)
    addFacet(facet, value)
    executeSearch()
  }
  return (
    <div className='ola-answer-tokens'>
      {translate('filter_suggestions')}
      {tokens.map(({ name, value }, idx) => {
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
    <button className='ola-btn ola-btn-token-add' onClick={handleAdd}>
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
