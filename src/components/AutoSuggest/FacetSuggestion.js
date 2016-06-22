import React from 'react'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { addFacet } from './../../actions/AutoSuggest'

class FacetSuggestion extends React.Component {
  static defaultProps = {
    limit: 3
  };
  onItemClick = (facet, name) => {
    let { dispatch, onSubmit } = this.props

    dispatch(addFacet(facet, name))

    /* Prevent race condition */

    setTimeout(() => onSubmit && onSubmit())
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.facets !== this.props.facets
  }
  render () {
    let { facets, q, name, limit } = this.props
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
              onItemClick={this.onItemClick}
            />
          )
        })}
      </div>
    )
  }
}

/**
 * Facet suggestion item
 */
class FacetSuggestionItem extends React.Component {
  handleClick = () => {
    this.props.onItemClick(this.props.facet, this.props.name)
  };
  render () {
    const { q, name } = this.props
    return (
      <a
        className='ola-facet-suggestion'
        tabIndex={0}
        onClick={this.handleClick}
      >
        <strong>{q}</strong> in {name}
      </a>
    )
  }
}

module.exports = FacetSuggestion
