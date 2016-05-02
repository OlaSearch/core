import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
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

    /* Lowercase */

    var filter = filterText.toLowerCase()

    var originalSize = values.length

    /* Filter values */

    values = values.filter((item) => item.name.toString().match(new RegExp(filter, 'i')))

    var size = values.length

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    var filterInput = (originalSize > limit
        ? <input
          type='text'
          className='ola-text-input ola-facet-filter-input'
          value={filterText}
          placeholder='Filter'
          arial-label='Input'
          onChange={this.onChangeFilterText}
        />
        : null)

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>

          {filterInput}
          <div className='ola-facet-list'>

            <div className='ola-facet-scroll-list'>
              <ReactList
                itemRenderer={(index, key) => {
                  var { name, count } = values[index]
                  var isActive = this.isSelected(name)

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
                }}
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
    const { isActive, facet, count, name } = this.props
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

module.exports = FacetToggle(CheckboxFilter)
