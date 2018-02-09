import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { addFacet, executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import Plus from '@olasearch/icons/lib/plus'
import { CREATE_FILTER_OBJECT, SLOT_DATE } from './../../constants/Settings'
import { ThemeConsumer } from './../../containers/OlaThemeContext'

function AnswerToken (
  {
    answer,
    addFacet,
    totalResults,
    executeSearch,
    facetQuery,
    facets,
    translate
  },
  { config }
) {
  if (!answer || !answer.search || !answer.search.slots || !totalResults) {
    return null
  }
  /* 1. Remove slots that have been already added */

  let slots = answer.search.slots
    .filter(({ suggest }) => suggest)
    .filter(({ name, value }) => {
      /**
       * Todo. Compare values also
       */
      return !facetQuery.some(({ name: _name, selected }) => _name === name)
    })

  /* 2. Remove slots that doesnt have any results */
  slots = slots.filter(({ name, value }) => {
    /* 2.1 Check if facet exists */
    let facet = find(propEq('name', name))(facets)
    /* Facet exists */
    if (facet) {
      /* 2.2 Check if value exists */
      return facet.values.some(({ name }) => value.indexOf(name) !== -1)
    }
    return true
  })

  /* If no slots hide */
  if (!slots.length) return null

  const { fieldLabels } = config

  function handleAddToken (slot) {
    let { name, value, type } = slot
    let facet = find(propEq('name', name))(config.facets)
    if (!facet) {
      facet = CREATE_FILTER_OBJECT({
        name,
        displayName: fieldLabels[name],
        type: type === SLOT_DATE ? 'daterange' : 'string',
        fromIntentEngine: true
      })
    }
    /* Take the first value only */
    addFacet(facet, value[0])
    executeSearch()
  }

  /**
   * 1. Check if facet exists
   * 2. Check if value exists in the facet
   */
  return (
    <ThemeConsumer>
      {(theme) => (
        <div className='ola-answer-slots'>
          <span className='ola-answer-slots-text'>
            {translate('filter_suggestions')}
          </span>
          {slots.map((slot, idx) => {
            const facet = config.facets.filter(
              ({ name: _name }) => _name === slot.name
            )
            const displayName =
              facet && facet.length
                ? facet[0].displayName
                : fieldLabels[slot.name]
            return (
              <AnswerTokenBtn
                key={`${idx}_${name}`}
                slot={slot}
                handleAddToken={handleAddToken}
                displayName={displayName}
              />
            )
          })}
          <style jsx>
            {`
              .ola-answer-slots :global(.ola-btn) {
                background: ${theme.primaryColor};
                color: ${theme.primaryInvertColor};
              }
            `}
          </style>
        </div>
      )}
    </ThemeConsumer>
  )
}

AnswerToken.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

function AnswerTokenBtn ({ slot, displayName, handleAddToken }) {
  function handleAdd () {
    handleAddToken(slot)
  }
  return (
    <button className='ola-btn ola-btn-slot-add' onClick={handleAdd}>
      {displayName}: {slot.match || slot.value}
      <Plus size={16} />
    </button>
  )
}

AnswerToken.defaultProps = {
  answer: null
}

function mapStateToProps (state) {
  return {
    answer: state.AppState.answer,
    facetQuery: state.QueryState.facet_query,
    facets: state.AppState.facets,
    totalResults: state.AppState.totalResults
  }
}

module.exports = connect(mapStateToProps, { addFacet, executeSearch })(
  withTranslate(AnswerToken)
)
