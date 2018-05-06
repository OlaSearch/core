import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

function getArrowClass (position) {
  switch (position) {
    case 'top-left':
      return 'bottom-left'
    case 'top-right':
      return 'bottom-right'
    case 'bottom-right':
      return 'top-right'
    case 'bottom-left':
      return 'top-left'
  }
}

function Arrow ({ position, style }) {
  const arrowClass = getArrowClass(position)
  const classes = cx('ola-arrow', {
    [`ola-arrow-${arrowClass}`]: arrowClass
  })
  return <div className={classes} />
}

Arrow.defaultProps = {
  position: 'top'
}

Arrow.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom'])
}

export default Arrow
