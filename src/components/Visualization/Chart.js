/* global bb */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'

/**
 * Displays a line chart
 */
class Chart extends React.Component {
  static propTypes = {
    /**
     * chart type
     */
    type: PropTypes.oneOf(['bar', 'line', 'step', 'spline'])
  }
  static defaultProps = {
    type: 'line',
    labels: true,
    x: 'x'
  }
  initChart () {
    const { type, types, data, labels } = this.props
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x: this.props.x,
        columns: this.props.data,
        ...(types ? { types } : { type }),
        labels
      },
      bubble: {
        maxR: 50
      },
      axis: {
        x: {
          tick: {
            format: (d) => d
          }
        }
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      padding: {
        right: 20,
        top: 20
      }
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
