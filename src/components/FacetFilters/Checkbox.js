import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import { facetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import ReactList from 'react-list'
import { getDisplayName } from './../../utilities'

class CheckboxFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      showMore: false
    }
  }

  static defaultProps = {
    limit: 6,
    listType: 'uniform'
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired
  };

  handleAddFacet = (facet, value) => {
    var { dispatch } = this.props

    this.setState({
      filterText: ''
    })

    dispatch(addFacet(facet, value))

    dispatch(executeSearch())
  };

  handleRemoveFacet = (facet, value) => {
    let { dispatch } = this.props
    dispatch(removeFacet(facet, value))
    dispatch(executeSearch())
  };

  onChangeFilterText = (event) => {
    this.setState({
      filterText: event.target.value
    })
  };

  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  };

  itemRenderer = (values, index, key) => {
    let { facet } = this.props
    let { name, count } = values[index]
    let isActive = this.isSelected(name)

    return (
      <CheckBoxItem
        key={index}
        facet={facet}
        name={name}
        count={count}
        handleAddFacet={this.handleAddFacet}
        handleRemoveFacet={this.handleRemoveFacet}
        isActive={isActive}
      />
    )
  };

  render () {
    var {
      filterText
    } = this.state

    var {
      facet,
      isCollapsed,
      toggleDisplay,
      limit,
      listType
    } = this.props

    var {
      values,
      displayName
    } = facet

    var originalSize = values.length

    /* Filter values */

    values = values.filter((item) => item.name.toString().match(new RegExp(filterText, 'i')))

    var size = values.length

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    var filterInput = originalSize > limit
      ? <input
        type='text'
        className='ola-text-input ola-facet-filter-input'
        value={filterText}
        placeholder='Filter'
        arial-label='Input'
        onChange={this.onChangeFilterText}
      />
      : null

    var itemRendererBound = this.itemRenderer.bind(this, values)

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>

          {filterInput}
          <div className='ola-facet-list'>

            <div className='ola-facet-scroll-list'>
              <ReactList
                itemRenderer={itemRendererBound}
                length={size}
                type={listType}
              />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

/**
 * Checkbox Item
 * JSX No Bind
 */
class CheckBoxItem extends React.Component {
  onChecked = (event) => {
    let { facet, name, handleAddFacet, handleRemoveFacet } = this.props
    if (event.target.checked) {
      handleAddFacet(facet, name)
    } else {
      handleRemoveFacet(facet, name)
    }
  }
  render () {
    let { isActive, facet, count, name } = this.props
    let { facetNames } = facet
    let labelKlass = classNames({
      'ola-checkbox ola-checkbox-label': true,
      'ola-checkbox-active': isActive
    })
    let displayName = getDisplayName(facetNames, name)
    return (
      <label className={labelKlass}>
        <input
          type='checkbox'
          checked={isActive}
          onChange={this.onChecked}
          />
        <span className='ola-search-facet-name' title={displayName}>{displayName}</span>
        <span className='ola-search-facet-count'>{count}</span>
      </label>
    )
  }
}

module.exports = facetToggle(CheckboxFilter)
