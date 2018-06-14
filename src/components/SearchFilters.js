import React from 'react'
import PropTypes from 'prop-types'
import Default from './FacetFilters/Default'
import FacetCheckbox from './FacetFilters/Checkbox'
import Hierarchical from './FacetFilters/Hierarchical'
import Range from './FacetFilters/Range'
import Rating from './FacetFilters/Rating'
import BooleanFilter from './FacetFilters/Boolean'
import DatePicker from './FacetFilters/DatePicker'
import TagCloud from './FacetFilters/TagCloud'
import SelectFilter from './FacetFilters/SelectFilter'
import flatten from 'ramda/src/flatten'
import equals from 'ramda/src/equals'
import classNames from 'classnames'
import { getFacetsToDisplay } from './../utilities'
import withConfig from './../decorators/withConfig'

class SearchFilters extends React.Component {
  static propTypes = {
    facets: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    conditional: PropTypes.bool
  }

  static defaultProps = {
    conditional: true,
    facets: []
  }

  shouldComponentUpdate (nextProps) {
    return (
      this.props.facets !== nextProps.facets ||
      !equals(this.props.selected, nextProps.selected)
    )
  }

  render () {
    const { selected, conditional, className, ...props } = this.props
    var { facets } = this.props

    /* Remove tabs */
    facets = facets.filter(({ type }) => type !== 'tab')

    /* Check for facets to display conditional */
    if (conditional) {
      /* Agree with `facetsToDisplay` */
      facets = getFacetsToDisplay(
        selected,
        facets,
        this.props.config.facetsToDisplay
      )
    }
    if (!facets.length) return null

    const classes = classNames('ola-search-filters', className)

    return (
      <div className={classes}>
        <div className='ola-search-filters-inner'>
          {facets.map((facet, index) => {
            /* Recalculate Selected values */
            const selectedFacets = selected
              .filter((item) => item.name === facet.name)
              .map((item) => item.selected)
            const selectedItems = flatten(selectedFacets)
            const { type, name } = facet
            const passProps = {
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
                return <BooleanFilter {...passProps} />

              case 'tagcloud':
                return <TagCloud {...passProps} />

              case 'select':
                return <SelectFilter {...passProps} />

              default:
                return <Default {...passProps} />
            }
          })}
        </div>
      </div>
    )
  }
}

export default withConfig(SearchFilters)
