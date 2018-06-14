import React from 'react'
import PropTypes from 'prop-types'
import Star from '@olasearch/icons/lib/star'
import FieldLabel from './../FieldLabel'
import withTheme from './../../../decorators/withTheme'

/**
 * Add a star rating field
 */
function Rating ({
  rating,
  interval,
  iconSize,
  activeClass,
  inActiveClass,
  emptyClass,
  fieldLabel,
  theme
}) {
  const normalized = rating / interval
  var stars = []
  const total = Math.max(Math.ceil(normalized), 0)
  const maxInterval = 100 / interval
  for (let i = 0; i < total; i++) {
    stars[i] = <Star size={iconSize} key={i} className={activeClass} />
  }
  for (let i = total; i < maxInterval; i++) {
    stars[i] = <Star size={iconSize} key={i} className={inActiveClass} />
  }
  if (!stars.length) stars = <div className={emptyClass} />
  return (
    <div className='ola-field ola-field-rating'>
      <FieldLabel label={fieldLabel} />
      <div className='ola-field-rating-stars'>{stars}</div>
      <style jsx>
        {`
          .ola-field-rating :global(.ola-rating-active) {
            fill: ${theme.primaryColor};
            color: ${theme.primaryColor};
          }
        `}
      </style>
    </div>
  )
}

Rating.defaultProps = {
  interval: 20,
  iconSize: 18,
  activeClass: 'ola-rating-active',
  inActiveClass: 'ola-rating-inactive',
  emptyClass: 'ola-rating-empty'
}

Rating.propTypes = {
  /**
   * Interval of the rating (between 1 and 100)
   */
  interval: PropTypes.number,
  /**
   * Rating of an item (between 1 and 100)
   */
  rating: PropTypes.number,
  activeClass: PropTypes.string,
  inActiveClass: PropTypes.string,
  emptyClass: PropTypes.string,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string
}

export default withTheme(Rating)
