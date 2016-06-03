import React from 'react'
import { removeFacet, replaceFacet, removeAllFacets, executeSearch } from './../../actions/Search'
import classNames from 'classnames'
import { getDisplayName } from './../../utilities'
import invariant from 'invariant'
import { flatten, find, propEq } from 'ramda'

class TabsFilter extends React.Component {

  static propTypes = {
    facets: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    resetFacetsOnSelect: React.PropTypes.bool
  };

  static defaultProps = {
    resetFacetsOnSelect: true
  };

  handleReplaceFacet = (facet, value) => {
    /**
     * Remove facets that are not in this tab
     */

    var { dispatch, resetFacetsOnSelect } = this.props

    if (resetFacetsOnSelect) dispatch(removeAllFacets())

    dispatch(replaceFacet(facet, value))

    this.props.beforeSelect && this.props.beforeSelect(facet, value)

    dispatch(executeSearch())
  };

  handleRemoveFacet = (facet) => {
    var { dispatch, resetFacetsOnSelect } = this.props

    if (resetFacetsOnSelect) dispatch(removeAllFacets())

    dispatch(removeFacet(facet))

    this.props.beforeSelect && this.props.beforeSelect(facet)

    dispatch(executeSearch())
  };

  getTabsForDisplay = (tab, values) => {
    var {
      tabsToDisplay
    } = tab

    invariant(tabsToDisplay, 'tabsToDisplay is required. It should be part of the individual facet')

    var tabs = []

    for (var i = 0; i < tabsToDisplay.length; i++) {
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
  };

  render () {
    var {
      facets,
      selected
    } = this.props

    var facet = find(propEq('tab', true))(facets)

    /* Return null if there is no facets */

    if (!facet) return null

    var { values } = facet
    var tabs = this.getTabsForDisplay(facet, values)

    var selectedItems = flatten(selected.filter((item) => item.name === facet.name).map((item) => item.selected))

    /* Calculate Total for All Tab */

    var totalCount = values.reduce((acc, obj) => acc + obj.count, 0)

    /* Class for all tab */

    var isAllSelected = !selectedItems.length

    var klassTab = classNames({
      'ola-tabs-label': true,
      'ola-tab-active': isAllSelected
    })

    return (
      <nav className='ola-tabs'>
        <a
          className={klassTab}
          onClick={() => {
            if (!isAllSelected) this.handleRemoveFacet(facet)
          }}
        >
          All
          <span className='ola-search-facet-count'>{totalCount}</span>
        </a>
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
 * Tab Item
 */
class TabItem extends React.Component {
  handleClick = () => {
    let { facet, value, isActive } = this.props
    let { name, count } = value
    if (!isActive && count) this.props.handleClick(facet, name)
  };
  render () {
    let { isActive, value, facet } = this.props
    let { name, count } = value
    let { facetNames } = facet
    let klass = classNames({
      'ola-tabs-label': true,
      'ola-tab-active': isActive
    })
    return (
      <a
        className={klass}
        type='button'
        onClick={this.handleClick}>
        <span className='ola-tab-name'>{getDisplayName(facetNames, name)}</span>
        <span className='ola-search-facet-count'>{count}</span>
      </a>
    )
  }
}

module.exports = TabsFilter
