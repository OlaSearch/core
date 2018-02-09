import React from 'react'
import {
  replaceFacet,
  executeSearch,
  removeFacetItem
} from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import withTranslate from './../../decorators/withTranslate'
import classNames from 'classnames'
import { toNestedArray } from './../../utilities'
import xssFilters from 'xss-filters'
import FacetTitle from './common/FacetTitle'

class HierarchicalFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      showMore: false
    }
  }
  onChangeFilterText = (event) => {
    this.setState({
      filterText: xssFilters.inHTMLData(event.target.value)
    })
  }
  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  }
  handleAddFacet = (value) => {
    var { dispatch, facet } = this.props

    this.setState({
      filterText: ''
    })

    /**
     * Allows only single selection
     * @param  {[type]} facet.allowSingleSelection
     * @return {[type]}
     */
    dispatch(replaceFacet(facet, value))
    dispatch(executeSearch())
  }

  handleRemoveFacet = (value) => {
    let { dispatch, facet } = this.props
    value = value.split('/').slice(0, -1)
    let path = value.join('/')
    if (value.length === parseInt(facet.rootLevel)) {
      dispatch(removeFacetItem(facet))
    } else {
      dispatch(replaceFacet(facet, path))
    }
    dispatch(executeSearch())
  }
  render () {
    var { facet, isCollapsed, toggleDisplay } = this.props

    var {
      values,
      displayName,
      allowSingleSelection,
      rootLevel = 0,
      rollUp = false,
      parentNode = null
    } = facet

    if (typeof rollUp === 'string') rollUp = rollUp !== 'false'

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection,
      'ola-facet-not-rollup': !rollUp
    })

    var originalSize = values.length

    /* Dont show anything when no items */
    if (!originalSize) return null

    /* Get Hierarchical values */
    values = toNestedArray(values, rootLevel, parentNode)
    /* Selected */
    let selected = this.props.selected
      .map((item) => item.split('/'))
      .reduce((o, i) => i, [])
    let selectedPath = []
    for (let i = 0, len = selected.length; i < len; i++) {
      selectedPath.push(
        selected[i - 1] ? selectedPath[i - 1] + '/' + selected[i] : selected[i]
      )
    }

    return (
      <div className={klass}>
        <FacetTitle
          displayName={facet.displayName}
          toggleDisplay={toggleDisplay}
          isCollapsed={isCollapsed}
        />
        <div className='ola-facet-wrapper'>
          <div className='ola-facet-list'>
            <CheckboxGroup
              values={values}
              handleAddFacet={this.handleAddFacet}
              handleRemoveFacet={this.handleRemoveFacet}
              selected={selectedPath}
              rollUp={rollUp}
            />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Group
 */
function CheckboxGroup (props) {
  let { values, rollUp, selected, handleAddFacet, handleRemoveFacet } = props
  if (!values) return null
  let isAnyChecked = values.some((value) => selected.indexOf(value.name) !== -1)

  return (
    <div className='ola-facet-h-group'>
      {values.map((value, idx) => {
        let index = selected.indexOf(value.name)
        let isActive = index !== -1

        if (isActive || !rollUp || !isAnyChecked) {
          return (
            <div className='ola-facet-h-group-inner' key={idx}>
              <CheckBoxItem
                value={value}
                handleAddFacet={handleAddFacet}
                handleRemoveFacet={handleRemoveFacet}
                isActive={isActive}
              />
              {value.children && isActive ? (
                <CheckboxGroup
                  values={value.children}
                  handleAddFacet={handleAddFacet}
                  handleRemoveFacet={handleRemoveFacet}
                  selected={selected}
                  rollUp={rollUp}
                />
              ) : null}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

/**
 * Item
 */
function CheckBoxItem ({ value, handleAddFacet, handleRemoveFacet, isActive }) {
  function onChecked (event) {
    let { name } = value
    if (event.target.checked) {
      handleAddFacet(name)
    } else {
      handleRemoveFacet(name)
    }
  }
  const { count, displayName } = value
  const labelKlass = classNames({
    'ola-checkbox ola-checkbox-label': true,
    'ola-checkbox-active': isActive
  })
  return (
    <label className={labelKlass}>
      <input
        type='checkbox'
        checked={isActive}
        onChange={onChecked}
        style={{
          opacity: 0,
          position: 'absolute'
        }}
      />
      <span className='ola-search-facet-name' title={displayName}>
        {displayName}
      </span>
      <span className='ola-search-facet-count'>{count}</span>
    </label>
  )
}

export default withTranslate(withToggle(HierarchicalFilter))
