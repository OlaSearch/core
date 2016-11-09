import React from 'react'
import { addFacet, removeFacet, replaceFacet, executeSearch, removeFacetItem } from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import injectTranslate from './../../decorators/OlaTranslate'
import classNames from 'classnames'
import ReactList from 'react-list'
import { getDisplayName, toNestedArray } from './../../utilities'
import FilterInput from './common/FilterInput'
import xss from 'xss'

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
      filterText: xss(event.target.value)
    })
  };
  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  };
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
  };

  handleRemoveFacet = (value) => {
    let { dispatch, facet } = this.props
    value = value.split('/').slice(0, -1)
    let path = value.join('/')
    if (value.length === facet.rootLevel) {
      dispatch(removeFacetItem(facet))
    } else {
      dispatch(replaceFacet(facet, path))
    }
    dispatch(executeSearch())
  };
  render () {
    var {
      facet,
      isCollapsed,
      toggleDisplay,
      limit,
      listType,
      translate
    } = this.props

    var {
      values,
      displayName,
      allowSingleSelection,
      allowedNames,
      rootLevel = 0,
      rollUp = false
    } = facet

    if (typeof rollUp === 'string') rollUp = (rollUp === 'false'? false : true)

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
    values = toNestedArray(values, rootLevel)
    /* Selected */
    let selected = this.props.selected.map((item) => item.split('/')).reduce((o, i) => i, [])
    let selectedPath = []
    for (var i = 0; i < selected.length; i++) {
      selectedPath.push(selected[i - 1] ? selectedPath[i-1] + '/' + selected[i] : selected[i])
    }

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
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
class CheckboxGroup extends React.Component {
  render () {
    let { values, rollUp, selected, rootLevel } = this.props
    if (!values) return null
    let isAnyChecked = values.some((value) => selected.indexOf(value.name) !== -1)

    return (
      <div className='ola-facet-h-group'>
        {values.map((value, idx) => {
          let index = selected.indexOf(value.name)
          let isActive = index !== -1

          if (isActive || !rollUp || !isAnyChecked) return (
            <div className='ola-facet-h-group-inner' key={idx}>
              <CheckBoxItem
                value={value}
                handleAddFacet={this.props.handleAddFacet}
                handleRemoveFacet={this.props.handleRemoveFacet}
                isActive={isActive}
              />
              {value.children && isActive
                ? <CheckboxGroup
                    values={value.children}
                    handleAddFacet={this.props.handleAddFacet}
                    handleRemoveFacet={this.props.handleRemoveFacet}
                    selected={selected}
                    rollUp={rollUp}
                  />
                : null
              }
            </div>
          )
          return null
        })}
      </div>
    )
  }
}

/**
 * Item
 */

class CheckBoxItem extends React.Component {
  onChecked = (event) => {
    let { value: { name }, handleAddFacet, handleRemoveFacet } = this.props
    if (event.target.checked) {
      handleAddFacet(name)
    } else {
      handleRemoveFacet(name)
    }
  }
  render () {
    let { value: { count, displayName }, isActive } = this.props
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
          style={{
            opacity: 0,
            position: 'absolute'
          }}
          />
        <span className='ola-search-facet-name' title={displayName}>{displayName}</span>
        <span className='ola-search-facet-count'>{count}</span>
      </label>
    )
  }
}

module.exports = injectTranslate(withFacetToggle(HierarchicalFilter))