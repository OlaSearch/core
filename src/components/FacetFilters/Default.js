import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import Tag from './../Misc/Tag'
import ReactList from 'react-list'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import { getDisplayName } from './../../utilities'

class LinkFilter extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      showMore: false
    }
  }

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired,
    limit: React.PropTypes.number.isRequired,
    showSelectedFacetItem: React.PropTypes.bool
  };

  static defaultProps = {
    limit: 5,
    showMoreText: 'Show more',
    showLessText: 'Show fewer',
    listType: 'uniform',
    showSelectedFacetItem: false
  };

  handleAddFacet = (value) => {
    let { dispatch, facet } = this.props

    this.setState({
      filterText: ''
    })

    dispatch(addFacet(facet, value))

    dispatch(executeSearch())
  };

  handleRemoveFacat = (value) => {
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
      filterText: event.target.value
    })
  };

  isSelected = (name) => {
    return this.props.selected.indexOf(name) > -1
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
      showMoreText,
      showLessText,
      listType,
      showSelectedFacetItem
    } = this.props

    var {
      values,
      facetNames
    } = facet

    /* Lowercase */

    var filter = filterText.toLowerCase()

    /* Filter values */

    values = values.filter((item) => item.name.toString().match(new RegExp(filter, 'i')))

    if (!showSelectedFacetItem) values = values.filter((item) => selected.indexOf(item.name) === -1)

    var size = values.length

    /* Should display show more link */

    var shouldDisplayShowMore = size > limit

    /* Show more */

    if (!showMore) values = values.slice(0, limit)

    var showMoreLink = shouldDisplayShowMore
      ? <button className='ola-btn ola-link-show-more' onClick={this.toggleshowMore}>{showMore ? showLessText : showMoreText}</button>
      : null

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <input
            type='text'
            className='ola-text-input ola-facet-filter-input'
            value={filterText}
            placeholder='Filter'
            arial-label='Input'
            onChange={this.onChangeFilterText}
          />

          <div className='ola-facet-tags-selected'>
            {selected.map((item, idx) => {
              return (
                <Tag
                  onRemove={() => this.handleRemoveFacat(item)}
                  name={item}
                  facet={facet}
                  key={idx}
                />
              )
            })}
          </div>

          <div className='ola-facet-list'>

            <div className='ola-facet-scroll-list'>
              <ReactList
                itemRenderer={(index, key) => {
                  var { name, count } = values[index]
                  var displayName = getDisplayName(facetNames, name)
                  return (
                    <Item
                      key={key}
                      isSelected={this.isSelected(name)}
                      name={name}
                      count={count}
                      displayName={displayName}
                      onItemClick={this.handleAddFacet}
                    />
                  )
                }}
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
      <button
        className={itemKlass}
        type='button'
        onClick={this.handleClick}
      >
        <span className='ola-search-facet-count'>{count}</span>
        <span className='ola-search-facet-name'>{displayName}</span>
      </button>
    )
  }
}

module.exports = FacetToggle(LinkFilter)
