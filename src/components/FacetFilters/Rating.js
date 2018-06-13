import React from 'react'
import PropTypes from 'prop-types'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import withTheme from './../../decorators/withTheme'
import classNames from 'classnames'
import { parseRangeValues } from './../../utilities'
import FacetTitle from './common/FacetTitle'
import Star from '@olasearch/icons/lib/star'

/**
 * Adds a star rating filter
 */
function RatingFilter (props) {
  function handleFacet (event) {
    var { dispatch, facet } = props
    var min = parseInt(event.target.value, 10)
    var value = [min, min + facet.interval]

    if (event.target.checked) {
      dispatch(addFacet(facet, value))
    } else {
      dispatch(removeFacet(facet, value))
    }

    /* Search */
    dispatch(executeSearch())
  }

  function isSelected (bounds, name) {
    /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
    return bounds.indexOf(parseInt(name)) > -1
  }

  const {
    facet,
    isCollapsed,
    toggle,
    activeClass,
    inActiveClass,
    emptyClass,
    iconSize,
    theme
  } = props
  const { values, step } = facet
  const classes = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })

  /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
  const selectedArray = parseRangeValues(props.selected)
  const bounds = selectedArray.map((item) => parseInt(item[0]))

  return (
    <div className={classes}>
      <FacetTitle
        displayName={facet.displayName}
        toggle={toggle}
        isCollapsed={isCollapsed}
      />
      <div className='ola-facet-wrapper'>
        <div className='ola-facet-list'>
          {values.map(({ name, count }, idx) => {
            const stars = []
            const normalized = Math.max(Math.ceil(parseInt(name) / step), 0)
            const isActive = isSelected(bounds, name)
            const labelKlass = classNames({
              'ola-checkbox ola-checkbox-label': true,
              'ola-checkbox-active': isActive
            })
            for (let i = 0; i < normalized; i++) {
              stars[i] = (
                <Star size={iconSize} key={i} className={activeClass} />
              )
            }

            return (
              <label key={idx} className={labelKlass}>
                <input
                  type='checkbox'
                  value={name}
                  onChange={handleFacet}
                  checked={isActive}
                />
                <span className='ola-search-facet-name'>{stars}</span>
                {count && (
                  <span className='ola-search-facet-count'>{count}</span>
                )}
              </label>
            )
          })}
        </div>
      </div>
      <style jsx>
        {`
          .ola-facet :global(.ola-rating-active) {
            fill: ${theme.primaryColor};
            color: ${theme.primaryColor};
          }
        `}
      </style>
    </div>
  )
}

RatingFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  facet: PropTypes.object.isRequired
}

RatingFilter.defaultProps = {
  activeClass: 'ola-rating-active',
  inActiveClass: 'ola-rating-inactive',
  emptyClass: 'ola-rating-empty',
  iconSize: 18
}

export default withTheme(withToggle(RatingFilter))
