import React from 'react'
import PropTypes from 'prop-types'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import Tag from './../Misc/Tag'
import ReactList from 'react-list'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import injectTranslate from './../../decorators/OlaTranslate'
import classNames from 'classnames'
import { getDisplayName } from './../../utilities'
import FilterInput from './common/FilterInput'
import xssFilters from 'xss-filters'

class LinkFilter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      showMore: false
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    facet: PropTypes.object.isRequired,
    limit: PropTypes.number.isRequired,
    showIfEmpty: PropTypes.bool,
    showSelectedFacetItem: PropTypes.bool
  };

  static defaultProps = {
    limit: 5,
    listType: 'uniform',
    showIfEmpty: false,
    showSelectedFacetItem: false,
    debug: false
  };

  handleAddFacet = (value) => {
    let { dispatch, facet } = this.props

    this.setState({
      filterText: ''
    })

    dispatch(addFacet(facet, value))
    dispatch(executeSearch())
  };

  handleRemoveFacet = (value) => {
    let { dispatch, facet } = this.props
    dispatch(removeFacet(facet, value))
    dispatch(executeSearch())
  };

  toggleshowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    })
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
    let { name, count } = values[index]
    let { facet: { facetNames } } = this.props
    let isSelected = this.isSelected(name)
    let displayName = getDisplayName(facetNames, name)
    return (
      <Item
        key={key}
        isSelected={isSelected}
        name={name}
        count={count}
        displayName={displayName}
        onItemClick={this.handleAddFacet}
      />
    )
  };

  render () {
    var {
      filterText,
      showMore
    } = this.state

    var {
      facet,
      limit,
      selected,
      isCollapsed,
      toggleDisplay,
      listType,
      translate,
      showIfEmpty,
      showSelectedFacetItem,
      debug
    } = this.props

    var {
      values,
      showSelectedTag = true,
      removeLabel
    } = facet

    /* Remove values with no name */
    values = values.filter((value) => value.name)

    if (!showSelectedFacetItem) values = values.filter((item) => selected.indexOf(item.name) === -1)

    var originalSize = values.length

    /* Dont show anything when no items */
    if (!originalSize && !showIfEmpty) return null

    /* Filter values */
    values = values.filter((item) => item.name.toString().match(new RegExp(filterText, 'i')))

    var size = values.length

    /* Should display show more link */

    var shouldDisplayShowMore = size > limit

    /* Show more */

    if (!showMore) values = values.slice(0, limit)

    var showMoreLink = shouldDisplayShowMore
      ? <button className={`ola-btn ola-link-show-more ${showMore ? 'ola-link-show-less' : ''}`} onClick={this.toggleshowMore}>{showMore ? translate('facet_filter_showless') : translate('facet_filter_showmore')}</button>
      : null

    var klass = classNames('ola-facet ola-facet-default', {
      'ola-facet-collapsed': isCollapsed
    })

    var itemRendererBound = this.itemRenderer.bind(this, values)

    var filterInput = originalSize > limit
      ? <FilterInput
        value={filterText}
        onChange={this.onChangeFilterText}
        placeholder={translate('facet_filter_placeholder')}
        />
      : null

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          {filterInput}
          {showSelectedTag || debug
            ? <div className='ola-facet-tags-selected'>
              {selected.map((item, idx) => {
                return (
                  <SelectedItem
                    name={item}
                    facet={facet}
                    handleRemove={this.handleRemoveFacet}
                    key={idx}
                    buttonLabel={removeLabel}
                  />
                )
              })}
            </div>
            : null
          }
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
 * Facet item component
 */

class Item extends React.Component {
  handleClick = () => {
    this.props.onItemClick(this.props.name)
  };
  render () {
    let { count, displayName, isSelected } = this.props
    let itemKlass = classNames('ola-btn', 'ola-facet-link', { 'ola-facet-link-active': isSelected })

    return (
      <div className='ola-btn-wrap'>
        <button
          className={itemKlass}
          type='button'
          onClick={this.handleClick}
          title={displayName}
        >
          <span className='ola-search-facet-name'>{displayName}</span>
        </button>
        <span className='ola-search-facet-count'>{count}</span>
      </div>
    )
  }
}

/**
 * Selected Tag
 */

class SelectedItem extends React.Component {
  handleRemove = () => {
    this.props.handleRemove(this.props.name)
  };
  render () {
    let { name, facet, buttonLabel } = this.props
    return (
      <Tag
        onRemove={this.handleRemove}
        name={name}
        facet={facet}
        buttonLabel={buttonLabel}
      />
    )
  }
}

module.exports = injectTranslate(withFacetToggle(LinkFilter))
