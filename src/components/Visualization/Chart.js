/* global bb */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'
import { debounce } from './../../utilities'
import {
  CHART_ANIMATION_TIMING,
  CHART_CATEGORY_NAME
} from './../../constants/Settings'

/**
 * Displays a line chart
 */
class Chart extends React.Component {
  constructor (props) {
    super(props)
    /**
     * Debouncing is necessary because, multiple prop changes can cause charts to change rapidly
     */
    this.debounceUpdateChart = debounce(
      this.updateChart,
      CHART_ANIMATION_TIMING
    )
  }
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
  handleClick = (d) => {
    const { index } = d
    this.props.onClick && this.props.onClick(d, this.props.data.category[index])
  }
  createChartData = () => {
    var { data, axis, x } = this.props
    var categories
    if (data && !Array.isArray(data)) {
      if (CHART_CATEGORY_NAME in data) {
        const { tick } = data
        categories = data[CHART_CATEGORY_NAME]
        axis = {
          x: {
            type: CHART_CATEGORY_NAME,
            tick,
            categories
          }
        }
        x = null
      }
      data = data['data']
    }
    return {
      data,
      axis,
      x,
      categories
    }
  }
  initChart () {
    var { type, types, labels, padding } = this.props
    const { axis, data, x } = this.createChartData()
    /* If data is empty initially, we do not initialize the chart yet */
    if (!data) return
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x,
        onclick: this.handleClick,
        columns: data,
        ...(types ? { types } : { type }),
        labels
      },
      bubble: {
        maxR: 50
      },
      axis,
      transition: {
        duration: CHART_ANIMATION_TIMING
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      padding
    })
  }
  updateChart = () => {
    const { data, categories } = this.createChartData()

    this.chart.load({
      unload: true,
      columns: data,
      categories
    })
  }
  componentDidMount () {
    this.mounted = true
  }
  componentDidUpdate (prevProps) {
    if (
      prevProps.isScriptLoadSucceed !== this.props.isScriptLoadSucceed &&
      this.props.isScriptLoadSucceed
    ) {
      return this.initChart()
    }
    /* If the data is empty initially, we check if the component has been mounted */
    if (
      this.mounted &&
      !this.chart &&
      this.props.isScriptLoadSucceed &&
      this.props.data
    ) {
      return this.initChart()
    }
    /* Prevent updating chart if there is some error */
    if (!this.chart) return

    this.debounceUpdateChart()
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
