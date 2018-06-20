/* global bb, d3 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'

/**
 * Displays a line chart
 */
const CATEGORY_NAME = 'category'

class Chart extends React.Component {
  static propTypes = {
    /**
     * Chart type
     */
    type: PropTypes.oneOf(['bar', 'line', 'step', 'spline']),
    /**
     * Name of the x axis data
     */
    x: PropTypes.string,
    /**
     * Show or hide labels in the chart
     */
    labels: PropTypes.boolean,
    /**
     * Chart padding
     */
    padding: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number
    }),
    /**
     * Axis options
     */
    axis: PropTypes.object,
    /**
     * Chart data
     */
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        category: PropTypes.array,
        data: PropTypes.array
      })
    ])
  }
  static defaultProps = {
    type: 'line',
    labels: false,
    x: 'x',
    axis: {
      x: {
        tick: {
          format: (d) => d
        }
      }
    },
    padding: {
      right: 20,
      top: 20
    }
  }
  initChart () {
    var { type, types, data, labels, axis, padding, x } = this.props
    if (!Array.isArray(data)) {
      const { tick } = data
      if (CATEGORY_NAME in data) {
        axis = {
          x: {
            type: CATEGORY_NAME,
            tick,
            categories: data[CATEGORY_NAME]
          }
        }
        x = null
      }
      data = data['data']
    }
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x,
        columns: data,
        ...(types ? { types } : { type }),
        labels
      },
      bubble: {
        maxR: 50
      },
      axis,
      bar: {
        width: {
          ratio: 0.5
        }
      },
      padding
    })
  }
  componentDidUpdate (prevProps) {
    if (
      prevProps.isScriptLoadSucceed !== this.props.isScriptLoadSucceed &&
      this.props.isScriptLoadSucceed
    ) {
      return this.initChart()
    }
    /* Prevent updating chart if there is some error */
    if (!this.chart) return

    this.chart.load({
      unload: true,
      columns: this.props.data
    })
  }
  registerRef = (el) => {
    this.chartRef = el
    /* Send ref back to parent container */
    this.props.innerRef && this.props.innerRef(el)
  }
  render () {
    const { isScriptLoaded, type } = this.props
    const classes = classNames(
      'ola-viz ola-viz-chart',
      {
        'ola-viz-loading': !isScriptLoaded
      },
      `ola-viz-type-${type}`
    )
    return (
      <div className={classes}>
        <div className='ola-viz-chart-el' ref={this.registerRef} />
      </div>
    )
  }
}

export default scriptLoader([
  'https://cdn.olasearch.com/assets/vendor/d3.v4.min.js',
  'https://cdn.olasearch.com/assets/vendor/billboard.min.js'
])(Chart)
