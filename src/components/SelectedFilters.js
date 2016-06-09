import React from 'react'
import { removeFacet, executeSearch, clearQueryTerm, removeFilter } from './../actions/Search'
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
    facets: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func,
    q: React.PropTypes.string,
    showQuery: React.PropTypes.boolean
  };

  static defaultProps = {
    showQuery: false,
    filters: []
  };

  handleRemoveFacet = (facet, value) => {
    let { dispatch } = this.props
    dispatch(removeFacet(facet, value))
    dispatch(executeSearch())
  };

  closeGuidePopover = () => {
    this.setState({
      showGuidePopover: false
    })
  };

  onRemoveQueryTag = () => {
    let { dispatch } = this.props
    dispatch(clearQueryTerm())
    dispatch(executeSearch())
  };
  handleRemoveFilter = (filter) => {
    let { dispatch } = this.props
    dispatch(removeFilter(filter))
    dispatch(executeSearch())
  };
  render () {
    var {
      facets,
      showQuery,
      q,
      filters
    } = this.props

    var {
      showGuidePopover
    } = this.state

    if (!facets &&
      !facets.length &&
      !q &&
      !filters &&
      !filters.length) return null

    return (
      <div className='ola-facet-tags'>
        <Tooltip
          isShown={showGuidePopover}
          onClose={this.closeGuidePopover}
        />

        {showQuery && q
          ? <div className='ola-facet-tag'>
            <span className='ola-facet-tag-name'>{q}</span>
            <button className='ola-facet-tag-remove' onClick={this.onRemoveQueryTag}></button>
          </div>
          : null
        }

        {facets.map((facet, idx) => {
          var { selected: tags } = facet

          return (
            <div key={idx} className='ola-facet-tags-group'>
              <span className='ola-facet-tags-heading'>{facet.displayName}: </span>
              {tags.map((value, index) => {
                return (
                  <SelectedItem
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
          var { field } = filter

          return (
            <SelectedFilterItem
              name={field}
              facet={filter}
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

class SelectedItem extends React.Component {
  handleRemove = () => {
    this.props.handleRemove(this.props.facet, this.props.name)
  };
  render () {
    let { name, facet } = this.props
    return (
      <Tag
        onRemove={this.handleRemove}
        name={name}
        facet={facet}
      />
    )
  }
}

/**
 * Selected Tag
 */

class SelectedFilterItem extends React.Component {
  handleRemove = () => {
    this.props.handleRemove(this.props.facet)
  };
  render () {
    let { name, facet } = this.props
    return (
      <Tag
        onRemove={this.handleRemove}
        name={name}
        facet={facet}
      />
    )
  }
}

module.exports = SelectedFilters
