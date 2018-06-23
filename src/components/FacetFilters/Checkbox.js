import React from 'react'
import PropTypes from 'prop-types'
import {
  addFacet,
  removeFacet,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import withTranslate from './../../decorators/withTranslate'
import classNames from 'classnames'
import ReactList from 'react-list'
import { getDisplayName, sanitizeText } from './../../utilities'
import { ALL_VALUES } from './../../constants/Settings'
import FilterInput from './common/FilterInput'
import FacetTitle from './common/FacetTitle'

/**
 * Displays a checkbox filter
 */
class CheckboxFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      showMore: false
    }
  }

  static defaultProps = {
    listType: 'uniform',
    selected: []
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.array,
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
    const { dispatch, facet } = this.props
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
      filterText: sanitizeText(event.target.value)
    })
  }

  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
  }

  itemRenderer = (values, index) => {
    const { facet: { facetNames } } = this.props
    const {
      name,
      count,
      displayName = getDisplayName(facetNames, name)
    } = values[index]
    const isActive = this.isSelected(name)

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
    const { filterText, showMore } = this.state

    const {
      facet,
      toggle,
      listType,
      translate,
      showIfEmpty,
      isCollapsed
    } = this.props

    const {
      allowSingleSelection,
      exclusions = [],
      fixedValues,
      defaultValue = []
    } = facet

    var { values, limit = 6 } = facet

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
      const selectedValue = [
        ...defaultValue.map((item) => item.replace(/(-)/gi, '')),
        ...fixedValues
      ]
      const acceptedValues = values.filter(
        ({ name }) => selectedValue.indexOf(name) !== -1
      )

      if (!acceptedValues.length && !showIfEmpty) return null
      const totalValueCount = acceptedValues.reduce((acc, item) => {
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

    const size = values.length

    /* Should display show more link */
    const shouldDisplayShowMore = size > limit

    /* Show more */
    if (!showMore) values = values.slice(0, limit)

    const showMoreLink = shouldDisplayShowMore ? (
      <button
        className={`ola-btn ola-link-show-more ${
          showMore ? 'ola-link-show-less' : ''
        }`}
        onClick={this.toggleshowMore}
      >
        {showMore
          ? translate('facet_filter_showless')
          : translate('facet_filter_showmore')}
      </button>
    ) : null

    const klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection
    })
    const filterInput =
      originalSize > limit ? (
        <FilterInput
          value={filterText}
          onChange={this.onChangeFilterText}
          placeholder={translate('facet_filter_placeholder')}
        />
      ) : null
    const itemRendererBound = this.itemRenderer.bind(this, values)

    return (
      <div className={klass}>
        <FacetTitle
          displayName={facet.displayName}
          toggle={toggle}
          isCollapsed={isCollapsed}
        />
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
    const { name, handleAddFacet, handleRemoveFacet } = props
    if (event.target.checked) {
      handleAddFacet(name)
    } else {
      handleRemoveFacet(name)
    }
  }

  const { isActive, count, displayName } = props
  const labelKlass = classNames({
    'ola-checkbox ola-checkbox-label': true,
    'ola-checkbox-active': isActive
  })
  return (
    <label className={labelKlass} title={displayName}>
      <input type='checkbox' checked={isActive} onChange={onChecked} />
      <span className='ola-search-facet-name'>{displayName}</span>
      {count && <span className='ola-search-facet-count'>{count}</span>}
    </label>
  )
}

export default withTranslate(withToggle(CheckboxFilter))
