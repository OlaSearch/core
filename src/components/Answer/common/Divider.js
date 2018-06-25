import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

/**
 * A divider component that spans full length
 * By default, it renders a vertical divider.
 * @param {boolean} { horizontal }
 */
export default function Divider ({ horizontal }) {
  const baseClass = 'ola-divider'
  const classes = cx(
    baseClass,
    horizontal ? `${baseClass}--horizontal` : `${baseClass}--vertical`
  )

  return <div className={classes} />
}

Divider.propTypes = {
  /**
   * Render a horizontal divider
   */
  horizontal: PropTypes.bool
}

Divider.defaultProps = {
  horizontal: true
}
