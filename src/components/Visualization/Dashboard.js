import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

/**
 * Visualization dashboard component
 */
function Dashboard ({ dashboard, ...rest }) {
  if (!dashboard || !dashboard.length) return null
  return (
    <div className='ola-viz-dashboard'>
      {dashboard.map((card, idx) => {
        return (
          <div className='ola-viz-item' key={idx}>
            <div className='ola-viz-item-inner'>
              <Card card={card} {...rest} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

Dashboard.defaultProps = {
  dashboard: []
}

Dashboard.propTypes = {
  dashboard: PropTypes.array
}

export default Dashboard
