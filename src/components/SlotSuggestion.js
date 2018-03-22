import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import {
  addFacet,
  executeSearch,
  removeSkipFacetFields
} from './../actions/Search'
import withTranslate from './../decorators/withTranslate'
import Plus from '@olasearch/icons/lib/plus'
import { CREATE_FILTER_OBJECT, SLOT_DATE } from './../constants/Settings'
import { getDisplayName, getFieldLabel } from './../utilities'
import withTheme from './../decorators/withTheme'
import withConfig from './../decorators/withConfig'

function SlotSuggestion ({
  answer,
  addFacet,
  removeSkipFacetFields,
  totalResults,
  executeSearch,
  facetQuery,
  facets,
  translate,
  theme,
  config
}) {
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
    let { name, value, type, facet_query } = slot
    let facet = find(propEq('name', name))(config.facets)
    if (!facet) {
      facet = CREATE_FILTER_OBJECT({
        name,
        displayName: getFieldLabel(name, fieldLabels),
        type: type === SLOT_DATE ? 'daterange' : 'string'
      })
    }
    /* Take the first value only */
    addFacet({ ...facet, fromIntentEngine: !!facet_query }, value[0])
    /* Remove the field from skip_facet_fields */
    removeSkipFacetFields(facet.name)
    /* Search */
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
      {slots.map((slot, idx) => {
        const facet = config.facets.filter(
          ({ name: _name }) => _name === slot.name
        )
        const displayName =
          facet && facet.length
            ? facet[0].displayName
            : getFieldLabel(slot.name, fieldLabels)
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
            vertical-align: middle;
          }
        `}
      </style>
    </div>
  )
}

function AnswerTokenBtn ({ slot, displayName, handleAddToken }) {
  function handleAdd () {
    handleAddToken(slot)
  }
  const { type, value, match } = slot
  return (
    <button className='ola-btn ola-btn-slot-add' onClick={handleAdd}>
      {displayName ? displayName + ': ' : null}
      {value && type !== SLOT_DATE ? getDisplayName(null, value[0]) : match}
      <Plus size={16} />
    </button>
  )
}

SlotSuggestion.defaultProps = {
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

module.exports = connect(mapStateToProps, {
  addFacet,
  executeSearch,
  removeSkipFacetFields
})(withConfig(withTranslate(withTheme(SlotSuggestion))))
