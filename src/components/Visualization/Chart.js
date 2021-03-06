/* global bb */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'
import { debounce } from './../../utilities'
import {
  CHART_DEBOUNCE_TIMING,
  CHART_CATEGORY_NAME
} from './../../constants/Settings'
import equals from 'ramda/src/equals'

/**
 * Displays a line chart
 */
class Chart extends React.Component {
  constructor (props) {
    super(props)
    /**
     * Debouncing is necessary because, multiple prop changes can cause charts to change rapidly
     */
    this._updateChart = debounce(
      () => window.requestAnimationFrame(this.updateChart),
      CHART_DEBOUNCE_TIMING
    )

    this.state = {
      categories: []
    }
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
    tick: undefined,
    axis: undefined,
    padding: {
      right: 20,
      top: 20
    },
    pattern: null /* Takes and array of colors. If null, d3 will automatically generate colors */,
    showGrid: true
  }
  handleClick = (d) => {
    const { index } = d
    this.props.onClick && this.props.onClick(d, this.props.data.category[index])
  }
  createChartData = () => {
    var { data, axis, x, tick } = this.props
    var categories
    var names
    if (data && !Array.isArray(data)) {
      if (CHART_CATEGORY_NAME in data) {
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
      names = data['names']
      data = data['data']
    }
    /* Set categories */
    this.setState({
      categories
    })

    return {
      data,
      axis,
      x,
      names,
      categories
    }
  }
  initChart () {
    var { type, types, labels, padding, showGrid } = this.props
    const { axis, data, x, names } = this.createChartData()
    /* If data is empty initially, we do not initialize the chart yet */
    if (!data || !data.length) return
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x,
        onclick: this.handleClick,
        columns: data,
        ...(types ? { types } : { type }),
        labels,
        names
      },
      bubble: {
        maxR: 50
      },
      axis,
      transition: {
        duration: CHART_DEBOUNCE_TIMING
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      tooltip: {
        format: {
          title: this.getTooltipTitle
        }
      },
      color: {
        pattern: this.props.pattern
      },
      grid: {
        x: {
          show: showGrid
        },
        y: {
          show: showGrid
        }
      },
      padding
    })
  }
  getTooltipTitle = (d) => {
    if (this.state.categories) return this.state.categories[d]
    return d
  }
  resizeChart = () => {
    if (!this.chart) return
    this.chart.resize()
  }
  updateChart = () => {
    const { data, categories, names } = this.createChartData()
    this.chart.load({
      unload: true,
      columns: data,
      categories
    })
    if (names) {
      this.chart.data.names(names)
    }
  }
  componentDidMount () {
    this.mounted = true
  }
  shouldComponentUpdate (nextProps) {
    return (
      !equals(nextProps.data, this.props.data) ||
      this.props.isScriptLoadSucceed !== nextProps.isScriptLoadSucceed
    )
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

    /* Update chart */
    this._updateChart()
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
