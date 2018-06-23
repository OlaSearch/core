import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  executeSearch,
  clearQueryTerm,
  removeFilter,
  removeFacetItem
} from './../actions/Search'
import Tag from './Misc/Tag'
import withConfig from './../decorators/withConfig'
import { getFieldLabel } from './../utilities'
import Swipeable from './Swipeable'
import flatten from 'ramda/src/flatten'

class SelectedFilters extends React.Component {
  static propTypes: {
    facets: PropTypes.array,
    filters: PropTypes.array,
    dispatch: PropTypes.func,
    q: PropTypes.string,
    grouped: PropTypes.boolean
  }

  static defaultProps = {
    showTabs: true,
    showZones: true,
    grouped: true,
    filters: [],
    facets: []
  }

  handleRemoveFacet = (facet, value) => {
    const { dispatch } = this.props
    if (facet.type === 'hierarchical') {
      dispatch(removeFacetItem(facet))
    } else {
      dispatch(removeFacet(facet, value))
    }
    dispatch(executeSearch())
  }

  onRemoveQueryTag = () => {
    const { dispatch } = this.props
    dispatch(clearQueryTerm())
    dispatch(executeSearch())
  }
  handleRemoveFilter = (filter) => {
    const { dispatch } = this.props
    dispatch(removeFilter(filter))
    dispatch(executeSearch())
  }
  shouldComponentUpdate (nextProps) {
    return (
      this.props.facets !== nextProps.facets ||
      this.props.q !== nextProps.q ||
      this.props.filters !== nextProps.filters
    )
  }
  render () {
    const { q, filters, showZones, showTabs, grouped } = this.props
    var { facets } = this.props
    const { fieldLabels } = this.props.config

    /* Remove tabs and zones */
    facets = facets.filter(
      ({ tab, zone }) => (showTabs ? true : !tab) && (showZones ? true : !zone)
    )

    if (!facets.length && !q && !filters.length) return null
    const facetTags = facets.map((facet) => {
      let { selected: tags, displayName } = facet
      const { options } = facet
      /* Remove hidden tags */
      tags = tags.filter(
        (_, idx) => (options && options[idx] ? !options[idx].isHidden : true)
      )
      if (!displayName) displayName = getFieldLabel(facet.name, fieldLabels)
      /* Error with babel-traverse */
      const _displayName = displayName ? (
        <span className='ola-facet-tags-heading'>{displayName}</span>
      ) : null
      if (!grouped) {
        return tags.map((value, index) => (
          <div key={index} className='ola-facet-tags-group'>
            {_displayName}
            <FacetItem
              name={value}
              facet={facet}
              handleRemove={this.handleRemoveFacet}
            />
          </div>
        ))
      }
    })
    const filterTags = filters.map((filter, idx) => {
      return (
        <FilterItem
          filter={filter}
          handleRemove={this.handleRemoveFilter}
          key={idx}
        />
      )
    })
    return (
      <div className='ola-facet-tags'>
        <Swipeable itemWidth='auto'>
          {flatten([...facetTags, ...filterTags])}
        </Swipeable>
      </div>
    )
  }
}

/**
 * Selected Tag
 */
function FacetItem ({ facet, name, handleRemove }) {
  function onRemove () {
    handleRemove(facet, name)
  }
  if (facet.rootLevel && facet.rootLevel > 0) {
    name = name
      .split('/')
      .slice(facet.rootLevel)
      .join('/')
  }
  return <Tag onRemove={onRemove} name={name} facet={facet} />
}

/**
 * Selected Tag
 */

function FilterItem ({ filter, handleRemove }) {
  function onRemove () {
    handleRemove(filter)
  }
  const { name } = filter
  return <Tag onRemove={onRemove} name={name} facet={filter} />
}

export default withConfig(SelectedFilters)
