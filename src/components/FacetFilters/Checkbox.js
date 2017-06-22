import React from 'react'
import PropTypes from 'prop-types'
import { addFacet, removeFacet, replaceFacet, executeSearch } from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import injectTranslate from './../../decorators/OlaTranslate'
import classNames from 'classnames'
import ReactList from 'react-list'
import { getDisplayName } from './../../utilities'
import FilterInput from './common/FilterInput'
import xssFilters from 'xss-filters'

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
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    facet: PropTypes.object.isRequired
  };

  handleAddFacet = (value) => {
    var { dispatch, facet } = this.props
    /**
     * Allows only single selection
     * @param  {[type]} facet.allowSingleSelection
     * @return {[type]}
     */
    if (facet.allowSingleSelection) {
      dispatch(replaceFacet(facet, value))
    } else {
      dispatch(addFacet(facet, value))
    }
    dispatch(executeSearch())
  };

  handleRemoveFacet = (value) => {
    let { dispatch, facet } = this.props
    dispatch(removeFacet(facet, value))
    dispatch(executeSearch())
  };

  onChangeFilterText = (event) => {
    this.setState({
      filterText: xssFilters.inHTMLData(event.target.value)
    })
  };

  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  };

  itemRenderer = (values, index, key) => {
    let { facet: { facetNames } } = this.props
    let { name, count } = values[index]
    let displayName = getDisplayName(facetNames, name)
    let isActive = this.isSelected(name)

    return (
      <CheckBoxItem
        key={index}
        name={name}
        displayName={displayName}
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
      listType,
      translate,
      showIfEmpty
    } = this.props

    var {
      values,
      displayName,
      allowSingleSelection,
      allowedNames
    } = facet

    /* Remove values with no name or name doesnt match allowedNames */
    values = values.filter((value) => value.name && (allowedNames ? allowedNames.indexOf(value.name) !== -1 : true))

    var originalSize = values.length

    /* Dont show anything when no items */
    if (!originalSize && !showIfEmpty) return null

    /* Filter values */

    values = values.filter((item) => item.name.toString().match(new RegExp(filterText, 'i')))

    var size = values.length
    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection
    })
    var filterInput = originalSize > limit
      ? <FilterInput
        value={filterText}
        onChange={this.onChangeFilterText}
        placeholder={translate('facet_filter_placeholder')}
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
    let { name, handleAddFacet, handleRemoveFacet } = this.props
    if (event.target.checked) {
      handleAddFacet(name)
    } else {
      handleRemoveFacet(name)
    }
  }
  render () {
    let { isActive, count, displayName } = this.props
    let labelKlass = classNames({
      'ola-checkbox ola-checkbox-label': true,
      'ola-checkbox-active': isActive
    })
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

module.exports = injectTranslate(withFacetToggle(CheckboxFilter))
