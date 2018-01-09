import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  executeSearch,
  clearQueryTerm,
  removeFilter,
  removeFacetItem,
  setSkipIntent
} from './../actions/Search'
import Tag from './Misc/Tag'
import Tooltip from './Misc/Tooltip'
import queryString from 'query-string'

class SelectedFilters extends React.Component {
  constructor (props) {
    super(props)

    /* Parse queryString to get the referrer */
    var qString = queryString.parse(window.location.search)

    this.state = {
      showGuidePopover: !!qString.referrer
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
    /* Check if the facet is from intent engine `fromIntentEngine` */
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
    var {
      facets,
      showQuery,
      q,
      filters,
      showZones,
      showTabs,
      grouped
    } = this.props

    var { showGuidePopover } = this.state

    /* Remove tabs and zones */
    facets = facets.filter(
      ({ tab, zone, options }, idx) =>
        (showTabs ? true : !tab) && (showZones ? true : !zone)
    )

    if (!facets.length && !q && !filters.length) return null

    return (
      <div className='ola-facet-tags'>
        <Tooltip isShown={showGuidePopover} onClose={this.closeGuidePopover} />
        {showQuery && q ? (
          <div className='ola-facet-tag'>
            <span className='ola-facet-tag-name'>{q}</span>
            <button
              className='ola-facet-tag-remove'
              onClick={this.onRemoveQueryTag}
            />
          </div>
        ) : null}
        {facets.map((facet, idx) => {
          let { selected: tags, displayName, options } = facet
          /* Remove hidden tags */
          tags = tags.filter(
            (_, idx) =>
              options && options[idx] ? !options[idx].isHidden : true
          )
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
          return (
            <div key={idx} className='ola-facet-tags-group'>
              {displayName && (
                <span className='ola-facet-tags-heading'>{displayName}</span>
              )}
              {tags.map((value, index) => {
                return (
                  <FacetItem
                    name={value}
                    facet={facet}
                    handleRemove={this.handleRemoveFacet}
                    key={index}
                  />
                )
              })}
            </div>
          )
        })}
        {filters.map((filter, idx) => {
          return (
            <FilterItem
              filter={filter}
              handleRemove={this.handleRemoveFilter}
              key={idx}
            />
          )
        })}
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
  let { name } = filter
  return <Tag onRemove={onRemove} name={name} facet={filter} />
}

module.exports = SelectedFilters
