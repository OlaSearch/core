import React from 'react'
import {
  replaceFacet,
  executeSearch,
  removeFacetItem
} from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import withTranslate from './../../decorators/withTranslate'
import classNames from 'classnames'
import { toNestedArray, sanitizeText } from './../../utilities'
import FacetTitle from './common/FacetTitle'
import ChevronLeft from '@olasearch/icons/lib/chevron-left'
import ChevronRight from '@olasearch/icons/lib/chevron-right'

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
      filterText: sanitizeText(event.target.value)
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
    const { dispatch, facet } = this.props
    value = value.split('/').slice(0, -1)
    const path = value.join('/')
    if (value.length === parseInt(facet.rootLevel)) {
      dispatch(removeFacetItem(facet))
    } else {
      dispatch(replaceFacet(facet, path))
    }
    dispatch(executeSearch())
  }
  render () {
    const { facet, isCollapsed, toggle } = this.props

    const {
      displayName,
      allowSingleSelection,
      rootLevel = 0,
      parentNode = null,
      facetNames
    } = facet

    let { values, rollUp = false } = facet

    if (typeof rollUp === 'string') rollUp = rollUp !== 'false'

    const klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection,
      'ola-facet-not-rollup': !rollUp
    })

    const originalSize = values.length

    /* Dont show anything when no items */
    if (!originalSize) return null

    /* Get Hierarchical values */
    values = toNestedArray(values, rootLevel, parentNode)
    /* Selected */
    const selected = this.props.selected
      .map((item) => item.split('/'))
      .reduce((o, i) => i, [])
    const selectedPath = []
    for (let i = 0, len = selected.length; i < len; i++) {
      selectedPath.push(
        selected[i - 1] ? selectedPath[i - 1] + '/' + selected[i] : selected[i]
      )
    }

    return (
      <div className={klass}>
        <FacetTitle
          displayName={facet.displayName}
          toggle={toggle}
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
  const { values, rollUp, selected, handleAddFacet, handleRemoveFacet } = props
  if (!values) return null
  const isAnyChecked = values.some((value) => selected.indexOf(value.name) !== -1)

  return (
    <div className='ola-facet-h-group'>
      {values.map((value, idx) => {
        const index = selected.indexOf(value.name)
        const isActive = index !== -1

        if (isActive || !rollUp || !isAnyChecked) {
          return (
            <div className='ola-facet-h-group-inner' key={idx}>
              <CheckBoxItem
                value={value}
                handleAddFacet={handleAddFacet}
                handleRemoveFacet={handleRemoveFacet}
                isActive={isActive}
                rollUp={rollUp}
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
function CheckBoxItem ({
  value,
  handleAddFacet,
  handleRemoveFacet,
  isActive,
  rollUp
}) {
  function onChecked (event) {
    const { name } = value
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
    <label className={labelKlass} title={displayName}>
      {isActive ? (
        rollUp ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )
      ) : null}
      <input
        type='checkbox'
        checked={isActive}
        onChange={onChecked}
        style={{
          opacity: 0,
          position: 'absolute'
        }}
      />
      <span className='ola-search-facet-name'>{displayName}</span>
      <span className='ola-search-facet-count'>{count}</span>
    </label>
  )
}

export default withTranslate(withToggle(HierarchicalFilter))
