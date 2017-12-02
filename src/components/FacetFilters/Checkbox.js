import React from 'react'
import PropTypes from 'prop-types'
import {
  addFacet,
  removeFacet,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaToggle'
import injectTranslate from './../../decorators/OlaTranslate'
import classNames from 'classnames'
import ReactList from 'react-list'
import { getDisplayName } from './../../utilities'
import { ALL_VALUES } from './../../constants/Settings'
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
    listType: 'uniform'
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    facet: PropTypes.object.isRequired
  }

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
  }

  handleRemoveFacet = (value) => {
    let { dispatch, facet } = this.props
    dispatch(removeFacet(facet, value))
    dispatch(executeSearch())
  }

  toggleshowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    })
  }

  onChangeFilterText = (event) => {
    this.setState({
      filterText: xssFilters.inHTMLData(event.target.value)
    })
  }

  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  }

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
  }

  render () {
    var { filterText, showMore } = this.state

    var {
      facet,
      toggleDisplay,
      listType,
      translate,
      showIfEmpty,
      isCollapsed
    } = this.props

    var {
      values,
      displayName,
      allowSingleSelection,
      exclusions = [],
      limit = 6,
      fixedValues,
      defaultValue = []
    } = facet

    /* Parse limit */
    limit = parseInt(limit)

    /* Remove values with no name or name doesnt match allowedNames */
    values = values.filter((value) => value.name)

    /* Remove values in exclusion list */
    values = values.filter(({ name }) => exclusions.indexOf(name) === -1)

    var originalSize = values.length

    /* User specified values */
    if (fixedValues && fixedValues.length) {
      /**
       * Example
       * defaultValue = [-Archived]
       * values = [{'name': 'Archived', count: 1}, { name: 'Online', count: 2}]
       * fixedValues = ['All', 'Online']
       * selectedValue = ['All', 'Archived', 'Online']
       * acceptedValues = ['All', 'Online']
       */
      let selectedValue = [
        ...defaultValue.map((item) => item.replace(/(-)/gi, '')),
        ...fixedValues
      ]
      let acceptedValues = values.filter(
        ({ name, count }) => selectedValue.indexOf(name) !== -1
      )

      if (!acceptedValues.length && !showIfEmpty) return null
      let totalValueCount = acceptedValues.reduce((acc, item) => {
        acc += item.count
        return acc
      }, 0)
      values = fixedValues.map((item) => ({
        name: item,
        count:
          item === ALL_VALUES
            ? totalValueCount
            : acceptedValues
                .filter(({ name }) => name === item)
                .reduce((acc, item) => {
                  acc += item.count
                  return acc
                }, 0)
      }))
      originalSize = values.length
    }

    /* Dont show anything when no items */
    if (!originalSize && !showIfEmpty) return null

    /* Filter values */
    values = values.filter((item) =>
      item.name.toString().match(new RegExp(filterText, 'i'))
    )

    var size = values.length

    /* Should display show more link */
    var shouldDisplayShowMore = size > limit

    /* Show more */
    if (!showMore) values = values.slice(0, limit)

    var showMoreLink = shouldDisplayShowMore ? (
      <button
        className={`ola-btn ola-link-show-more ${showMore
          ? 'ola-link-show-less'
          : ''}`}
        onClick={this.toggleshowMore}
      >
        {showMore
          ? translate('facet_filter_showless')
          : translate('facet_filter_showmore')}
      </button>
    ) : null

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection
    })
    var filterInput =
      originalSize > limit ? (
        <FilterInput
          value={filterText}
          onChange={this.onChangeFilterText}
          placeholder={translate('facet_filter_placeholder')}
        />
      ) : null
    var itemRendererBound = this.itemRenderer.bind(this, values)

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>
          {displayName}
        </h4>
        <div className='ola-facet-wrapper'>
          {filterInput}
          <div className='ola-facet-list'>
            <div className='ola-facet-scroll-list'>
              <ReactList
                itemRenderer={itemRendererBound}
                length={values.length}
                type={listType}
              />
            </div>
            {showMoreLink}
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
function CheckBoxItem (props) {
  function onChecked (event) {
    let { name, handleAddFacet, handleRemoveFacet } = props
    if (event.target.checked) {
      handleAddFacet(name)
    } else {
      handleRemoveFacet(name)
    }
  }

  let { isActive, count, displayName } = props
  let labelKlass = classNames({
    'ola-checkbox ola-checkbox-label': true,
    'ola-checkbox-active': isActive
  })
  return (
    <label className={labelKlass}>
      <input type='checkbox' checked={isActive} onChange={onChecked} />
      <span className='ola-search-facet-name' title={displayName}>
        {displayName}
      </span>
      {count && <span className='ola-search-facet-count'>{count}</span>}
    </label>
  )
}

module.exports = injectTranslate(withFacetToggle(CheckboxFilter))
