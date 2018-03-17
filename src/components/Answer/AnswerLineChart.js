import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'
import TableDetail from './common/TableDetail'

/**
 * Displays a line chart
 * @example ./src/components/Answer/AnswerLineChart.md
 */
class AnswerLineChart extends React.Component {
  static propTypes = {
    /**
     * answer card object
     */
    card: PropTypes.object,
    /**
     * chart type
     */
    type: PropTypes.oneOf(['bar', 'line', 'step', 'spline'])
  }
  static defaultProps = {
    type: 'line'
  }
  sanitize = (text) => {
    if (typeof text !== 'string') return text
    return text.replace(/<(?:.*|\n)*?>/gm, '')
  }
  prepareData = (card) => {
    let { record_keys = [], record_data = [] } = card
    let keys = record_keys.filter((key) => key !== 'Country')
    let data = record_data.slice(0, 5).map((item) => {
      let country = item['Country']
      return [].concat(
        country,
        keys.map((key) => {
          return key in item ? this.sanitize(item[key]) : null
        })
      )
    })
    return [['x', ...keys], ...data]
  }
  drawChart () {
    const { card } = this.props
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (card.record_keys.length <= 2) {
      this.chartRef.style.display = 'none'
    }
    const chartData = this.prepareData(card)
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x: 'x',
        columns: chartData,
        type: this.props.type
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
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.card !== this.props.card ||
      nextProps.isScriptLoadSucceed !== this.props.isScriptLoadSucceed ||
      nextProps.isScriptLoaded !== this.props.isScriptLoaded
    )
  }
  componentDidUpdate (prevProps) {
    const { card } = this.props
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (
      prevProps.isScriptLoadSucceed !== this.props.isScriptLoadSucceed &&
      this.props.isScriptLoadSucceed
    ) {
      return this.drawChart()
    }
    if (!this.chart) return
    if (card.record_keys.length <= 2) {
      return (this.chartRef.style.display = 'none')
    } else {
      this.chartRef.style.display = 'block'
    }

    const chartData = this.prepareData(card)
    this.chart.load({
      unload: true,
      columns: chartData
    })
  }
  registerRef = (el) => {
    this.chartRef = el
  }
  render () {
    const { card, isScriptLoaded } = this.props
    const { record_keys, record_data, title } = card
    const showChart = record_keys.length > 2
    const answerClass = classNames('ola-answer-linechart', {
      'ola-answer-linechart-loading': !isScriptLoaded
    })
    return (
      <div className='ola-answer-chart'>
        {title && (
          <div className='ola-answer-title ola-answer-chart-title'>{title}</div>
        )}
        <div ref={this.registerRef} className={answerClass} />
        <TableDetail {...this.props} />
      </div>
    )
  }
}

export default scriptLoader([
  'https://cdn.olasearch.com/assets/vendor/d3.v4.min.js',
  'https://cdn.olasearch.com/assets/vendor/billboard.min.js'
])(AnswerLineChart)
