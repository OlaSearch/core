import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import ReactList from 'react-list'

class Default extends React.Component {

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
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired
  };

  handleAddFacet = (facet, value) => {
    var { dispatch } = this.props

    this.setState({
      filterText: ''
    })

    dispatch(addFacet(facet, value))

    dispatch(executeSearch())
  };

  handleRemoveFacet = (facet, value) => {
    this.props.dispatch(removeFacet(facet, value))

    this.props.dispatch(executeSearch())
  };

  onChangeFilterText = (event) => {
    this.setState({
      filterText: event.target.value
    })
  };

  render () {
    var {
      filterText
    } = this.state

    var {
      facet,
      selected,
      isCollapsed,
      toggleDisplay,
      limit,
      listType
    } = this.props

    var {
      values
    } = facet

    /* Lowercase */

    var filter = filterText.toLowerCase()

    var originalSize = values.length

    /* Filter values */

    values = values.filter((item) => item.name.match(new RegExp(filter, 'i')))

    var size = values.length

    /**
     * Helper method to check if the checkbox should be `checked`
     */
    var isSelected = (name) => selected.indexOf(name) > -1

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    var filterInput = (originalSize > limit
        ? <input
          type='text'
          className='ola-text-input ola-facet-filter-input'
          value={filterText}
          placeholder='Filter'
          arial-label='Input'
          onChange={this.onChangeFilterText}
        />
        : null)

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>

          {filterInput}
          <div className='ola-facet-list'>

            <div className='ola-facet-scroll-list'>
              <ReactList
                itemRenderer={(index, key) => {
                  var { name, count } = values[index]
                  var handleAddFacet = this.handleAddFacet.bind(this, facet, name)
                  var handleRemoveFacet = this.handleRemoveFacet.bind(this, facet, name)
                  var isActive = isSelected(name)
                  var labelKlass = classNames({
                    'ola-checkbox ola-checkbox-label': true,
                    'ola-checkbox-active': isActive
                  })

                  return (
                    <label className={labelKlass} key={index}>
                      <input
                        type='checkbox'
                        checked={isActive}
                        onChange={(event) => {
                          if (event.target.checked) {
                            handleAddFacet()
                          } else {
                            handleRemoveFacet()
                          }
                        }}
                        />
                      <span
                        className='ola-search-facet-name'
                        title={name}
                      >{name}</span>
                      <span
                        className='ola-search-facet-count'
                      >{count}</span>
                    </label>
                  )
                }}
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

module.exports = FacetToggle(Default)
