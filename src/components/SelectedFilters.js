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
import queryString from 'query-string'
import withConfig from './../decorators/withConfig'
import { getFieldLabel } from './../utilities'
import Swipeable from './Swipeable'
import flatten from 'ramda/src/flatten'

class SelectedFilters extends React.Component {
  constructor (props) {
    super(props)

    /* Parse queryString to get the referrer */
    // var qString = queryString.parse(window.location.search)

    this.state = {
      showGuidePopover: false //! !qString.referrer
    }
  }

  static propTypes: {
    facets: PropTypes.array,
    filters: PropTypes.array,
    dispatch: PropTypes.func,
    q: PropTypes.string,
    showQuery: PropTypes.boolean,
    grouped: PropTypes.boolean
  }

  static defaultProps = {
    showQuery: false,
    showTabs: true,
    showZones: true,
    grouped: true,
    filters: [],
    facets: []
  }

  handleRemoveFacet = (facet, value) => {
    let { dispatch } = this.props
    if (facet.type === 'hierarchical') {
      dispatch(removeFacetItem(facet))
    } else {
      dispatch(removeFacet(facet, value))
    }
    dispatch(executeSearch())
  }

  closeGuidePopover = () => {
    this.setState({
      showGuidePopover: false
    })
  }

  onRemoveQueryTag = () => {
    let { dispatch } = this.props
    dispatch(clearQueryTerm())
    dispatch(executeSearch())
  }
  handleRemoveFilter = (filter) => {
    let { dispatch } = this.props
    dispatch(removeFilter(filter))
    dispatch(executeSearch())
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.facets !== nextProps.facets ||
      this.props.q !== nextProps.q ||
      this.props.filters !== nextProps.filters ||
      this.state.showGuidePopover !== nextState.showGuidePopover
    )
  }
  render () {
    const { showQuery, q, filters, showZones, showTabs, grouped } = this.props
    var { facets } = this.props

    const { showGuidePopover } = this.state
    const { fieldLabels } = this.props.config

    /* Remove tabs and zones */
    facets = facets.filter(
      ({ tab, zone, options }, idx) =>
        (showTabs ? true : !tab) && (showZones ? true : !zone)
    )

    if (!facets.length && !q && !filters.length) return null
    const facetTags = facets.map((facet, idx) => {
      let { selected: tags, displayName, options } = facet
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

module.exports = withConfig(SelectedFilters)
