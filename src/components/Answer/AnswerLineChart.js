import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scriptLoader from 'react-async-load-script'
import TableDetail from './common/TableDetail'
import Source from './common/Source'
import Chart from './../Visualization/Chart'

/**
 * Displays a chart
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
    type: PropTypes.oneOf(['bar', 'line', 'step', 'spline']),
    /**
     * Should refresh
     */
    refresh: PropTypes.bool
  }
  static defaultProps = {
    type: 'line'
  }
  sanitize = (text) => {
    if (typeof text !== 'string') return text
    return text.replace(/<(?:.*|\n)*?>/gm, '')
  }
  prepareData = () => {
    const { record_keys = [], record_data = [] } = this.props.card
    const keys = record_keys.filter((key) => key !== 'Country')
    const data = record_data.slice(0, 5).map((item) => {
      const country = item['Country']
      return [].concat(
        country,
        keys.map((key) => {
          return key in item ? this.sanitize(item[key]) : null
        })
      )
    })
    return [['x', ...keys], ...data]
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.card !== this.props.card ||
      nextProps.refresh !== this.props.refresh
    )
  }
  componentDidUpdate (prevProps) {
    if (this.props.card.record_keys.length <= 2) {
      return (this.chartRef.style.display = 'none')
    } else {
      this.chartRef.style.display = 'block'
    }
  }
  registerRef = (el) => {
    this.chartRef = el
  }
  render () {
    const { card } = this.props
    const { title, source } = card
    return (
      <div className='ola-answer-chart'>
        <div className='ola-answer-card-wrapper'>
          {title && (
            <div className='ola-answer-title ola-answer-chart-title'>
              {title}
            </div>
          )}
          <Chart
            data={this.prepareData()}
            innerRef={this.registerRef}
            type={this.props.type}
          />
          <TableDetail {...this.props} />
        </div>
        <Source source={source} />
      </div>
    )
  }
}

export default AnswerLineChart
