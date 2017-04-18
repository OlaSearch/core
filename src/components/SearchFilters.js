import React from 'react'
import PropTypes from 'prop-types'
import Default from './FacetFilters/Default'
import FacetCheckbox from './FacetFilters/Checkbox'
import Hierarchical from './FacetFilters/Hierarchical'
import Range from './FacetFilters/Range'
import Rating from './FacetFilters/Rating'
import FacetBoolean from './FacetFilters/Boolean'
import DatePicker from './FacetFilters/DatePicker'
import TagCloud from './FacetFilters/TagCloud'
import flatten from 'ramda/src/flatten'
import equals from 'ramda/src/equals'
import classNames from 'classnames'
import { getFacetsToDisplay } from './../utilities'

class SearchFilters extends React.Component {
  static contextTypes = {
    config: PropTypes.object
  };

  static propTypes = {
    facets: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    dispatch: PropTypes.func,
    conditional: PropTypes.bool,
    showSelectedFacetItem: PropTypes.bool
  };

  static defaultProps = {
    conditional: true
  };

  shouldComponentUpdate (nextProps) {
    return (
      this.props.facets !== nextProps.facets ||
      !equals(this.props.selected, nextProps.selected)
    )
  }

  render () {
    var {
      facets,
      selected,
      conditional,
      className,
      ...props
    } = this.props

    /* Remove tabs */
    facets = facets.filter(({ type }) => type !== 'tab')

    /* Check for facets to display conditional */
    if (conditional) {
      /* Agree with `facetsToDisplay` */
      facets = getFacetsToDisplay(selected, facets, this.context.config.facetsToDisplay)
    }
    if (!facets.length) return null

    let parentClass = classNames('ola-search-filters', className)

    return (
      <div className={parentClass}>
        <div className='ola-search-filters-inner'>
          {facets.map((facet, index) => {
            /* Recalculate Selected values */

            let selectedFacets = selected
                  .filter((item) => item.name === facet.name)
                  .map((item) => item.selected)
            let selectedItems = flatten(selectedFacets)
            let { type, name } = facet
            let passProps = {
              facet,
              selected: selectedItems,
              key: name,
              ...props
            }

            switch (type) {
              case 'checkbox':
                return <FacetCheckbox {...passProps} />

              case 'hierarchical':
                return <Hierarchical {...passProps} />

              case 'range':
              case 'daterange':
                return <Range {...passProps} />

              case 'datepicker':
                return <DatePicker {...passProps} />

              case 'rating':
                return <Rating {...passProps} />

              case 'boolean':
                return <FacetBoolean {...passProps} />

              case 'tagcloud':
                return <TagCloud {...passProps} />

              default:
                return <Default {...passProps} />
            }
          })}
        </div>
      </div>
    )
  }
}

module.exports = SearchFilters
