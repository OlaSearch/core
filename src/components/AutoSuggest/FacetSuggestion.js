import React from 'react'
import { flatten } from 'ramda'

class FacetSuggestion extends React.Component {
  onItemClick = (facet, value) => {
    let { dispatch, addFacet, onSubmit } = this.props

    dispatch(addFacet(facet, value.name))

    /* Prevent race condition */

    setTimeout(() => { onSubmit && onSubmit() }, 0)
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.facets !== this.props.facets
  }
  render () {
    let { facets, query, name, limit } = this.props
    let facet = facets.filter((item) => item.name === name)
    let values = flatten(facet.map((item) => item.values)).splice(0, limit)
    let { q } = query

    return (
      <div className='ola-facet-suggestions'>
        {values.map((value, idx) => {
          return (
            <FacetSuggestionItem
              key={idx}
              facet={facet[0]}
              value={value}
              q={q}
              onItemClick={this.onItemClick}
            />
          )
        })}
      </div>
    )
  }
}

FacetSuggestion.defaultProps = {
  limit: 3
}

class FacetSuggestionItem extends React.Component {
  handleClick = () => {
    this.props.onItemClick(this.props.facet, this.props.value)
  };
  render () {
    const { q, value } = this.props
    return (
      <a
        className='ola-facet-suggestion'
        tabIndex={0}
        onClick={this.handleClick}
      >
        <strong>{q}</strong> in {value.name}
      </a>
    )
  }
}

module.exports = FacetSuggestion
