import React from 'react'
import find from 'rambda/lib/find'
import propEq from 'rambda/lib/propEq'
import { addFacet } from './../../actions/AutoSuggest'

const FacetSuggestion = (props) => {
  function onItemClick (facet, name) {
    let { dispatch, onSubmit } = props

    dispatch(addFacet(facet, name))

    /* Prevent race condition */
    setTimeout(() => onSubmit && onSubmit())
  }
  let { facets, q, name, limit } = props
  let facet = find(propEq('name', name))(facets)
  if (!facet) return null

  let values = facet.values.splice(0, limit)

  return (
    <div className='ola-facet-suggestions'>
      {values.map((value, idx) => {
        return (
          <FacetSuggestionItem
            key={idx}
            facet={facet}
            name={value.name}
            q={q}
            onItemClick={onItemClick}
          />
        )
      })}
    </div>
  )
}

FacetSuggestion.defaultProps = {
  limit: 3
}

/**
 * Facet suggestion item
 */
const FacetSuggestionItem = ({ facet, name, q, onItemClick }) => {
  function handleClick () {
    onItemClick(facet, name)
  }
  return (
    <a className='ola-facet-suggestion' tabIndex={0} onClick={handleClick}>
      <strong>{q}</strong> in {name}
    </a>
  )
}

module.exports = FacetSuggestion
