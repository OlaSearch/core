import React from 'react'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { addFacet } from './../../actions/AutoSuggest'

const FacetSuggestion = (props) => {
  function onItemClick (facet, name) {
    const { dispatch, onSubmit } = props

    dispatch(addFacet(facet, name))

    /* Prevent race condition */
    setTimeout(() => onSubmit && onSubmit())
  }
  const { facets, q, name, limit } = props
  const facet = find(propEq('name', name))(facets)
  if (!facet) return null

  const values = facet.values.splice(0, limit)

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

export default FacetSuggestion
