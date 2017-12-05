import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  replaceFacet,
  removeAllFacets,
  executeSearch
} from './../../actions/Search'
import classNames from 'classnames'
import { getDisplayName } from './../../utilities'
import injectTranslate from './../../decorators/injectTranslate'
import flatten from 'ramda/src/flatten'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'

class TabsFilter extends React.Component {
  static propTypes = {
    facets: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    resetFacetsOnSelect: PropTypes.bool
  }

  static defaultProps = {
    resetFacetsOnSelect: true
  }

  handleReplaceFacet = (facet, value) => {
    /**
     * Remove facets that are not in this tab
     */
    var { dispatch, resetFacetsOnSelect } = this.props

    if (resetFacetsOnSelect) dispatch(removeAllFacets())

    dispatch(replaceFacet(facet, value))

    this.props.beforeSelect && this.props.beforeSelect(facet, value)

    dispatch(executeSearch())
  }

  handleRemoveFacet = (facet) => {
    var { dispatch, resetFacetsOnSelect } = this.props

    if (resetFacetsOnSelect) dispatch(removeAllFacets())

    dispatch(
      removeFacet(facet, null, true)
    ) /* 3rd argument is to reset all facets: resetAllFacets */

    this.props.beforeSelect && this.props.beforeSelect(facet)

    dispatch(executeSearch())
  }

  getTabsForDisplay = (facet, values) => {
    var { tabsToDisplay } = facet

    if (!tabsToDisplay) {
      throw new Error(
        'tabsToDisplay is required. It should be part of the individual facet'
      )
    }

    var tabs = []

    for (let i = 0, len = tabsToDisplay.length; i < len; i++) {
      let tab = values.filter((item) => item.name === tabsToDisplay[i])

      if (tab.length) {
        tabs.push({
          name: tab[0].name,
          count: tab[0].count
        })
      } else {
        tabs.push({
          name: tabsToDisplay[i],
          count: 0
        })
      }
    }

    return tabs
  }
  shouldComponentUpdate (nextProps) {
    return (
      this.props.facets !== nextProps.facets ||
      this.props.selected !== nextProps.selected
    )
  }
  render () {
    var { facets, selected, name, translate } = this.props

    var facet = find(propEq('name', name))(facets)

    /* Return null if there is no facets */

    if (!facet) return null

    var { values } = facet
    var tabs = this.getTabsForDisplay(facet, values)
    var selectedItems = flatten(
      selected
        .filter((item) => item.name === facet.name)
        .map((item) => item.selected)
    )

    /* Calculate Total for All Tab */

    var totalCount = values.reduce((acc, obj) => acc + obj.count, 0)

    /* Class for all tab */

    var isAllSelected = !selectedItems.length

    return (
      <nav className='ola-tabs'>
        <TabItemAll
          isSelected={isAllSelected}
          facet={facet}
          totalCount={totalCount}
          handleClick={this.handleRemoveFacet}
          label={translate('facet_tabs_all_label')}
        />
        {tabs.map((value, idx) => {
          var isActive = selectedItems.indexOf(value.name) !== -1
          return (
            <TabItem
              key={idx}
              facet={facet}
              value={value}
              handleClick={this.handleReplaceFacet}
              isActive={isActive}
            />
          )
        })}
      </nav>
    )
  }
}

/**
 * Tag Item All
 */
function TabItemAll ({ isSelected, totalCount, label, handleClick, facet }) {
  function onClick () {
    if (!isSelected) handleClick(facet)
  }
  var klassTab = classNames({
    'ola-tabs-label': true,
    'ola-tab-active': isSelected
  })
  return (
    <a className={klassTab} onClick={onClick}>
      {label}
      <span className='ola-search-facet-count'>{totalCount}</span>
    </a>
  )
}

/**
 * Tab Item
 */
function TabItem ({ facet, value, isActive, handleClick }) {
  function onClick () {
    let { name, count } = value
    if (!isActive && count) handleClick(facet, name)
  }
  let { name, count } = value
  let { facetNames } = facet
  let klass = classNames({
    'ola-tabs-label': true,
    'ola-tab-active': isActive
  })
  return (
    <a className={klass} type='button' onClick={onClick}>
      <span className='ola-tab-name'>{getDisplayName(facetNames, name)}</span>
      <span className='ola-search-facet-count'>{count}</span>
    </a>
  )
}

module.exports = injectTranslate(TabsFilter)
