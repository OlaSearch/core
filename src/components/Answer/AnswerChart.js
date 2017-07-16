import React from 'react'
import { bb } from 'billboard.js'
import TableDetail from 'olasearch/lib/components/Answer/common/TableDetail'

export default class AnswerCharts extends React.Component {
  componentDidMount () {
    this.drawChart()
  }
  sanitize = (text) => {
    if (typeof text !== 'string') return text
    return text.replace(/<(?:.*|\n)*?>/gm, '')
  };
  prepareData = (props) => {
    let { data: { record_keys: recordKeys = [], record_data: recordData = [] } } = props
    let keys = recordKeys.filter((key) => key !== 'Country')
    let data = recordData.slice(0, 5).map((item) => {
      let country = item['Country']
      return [].concat(country, keys.map((key) => {
        return key in item ? this.sanitize(item[key]) : null
      }))
    })
    return [
      ['x', ...keys],
      ...data
    ]
  }
  drawChart () {
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (this.props.data.record_keys.length <= 2) {
      this.chartRef.style.display = 'none'
    }

    let data = this.prepareData(this.props)
    this.chart = bb.generate({
      bindto: this.chartRef,
      data: {
        x: 'x',
        columns: data
      },
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
    })
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.data !== this.props.data
  }
  componentDidUpdate () {
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (this.props.data.record_keys.length <= 2) {
      this.chartRef.style.display = 'none'
      return
    } else {
      this.chartRef.style.display = 'block'
    }

    let data = this.prepareData(this.props)
    this.chart.load({
      unload: true,
      columns: data
    })
  }
  registerRef = (el) => {
    this.chartRef = el
  };
  render () {
    let { title } = this.props
    return (
      <div className='ola-answer-chart'>
        {title && <h4 className='ola-answer-table-caption'>{title}</h4>}
        <div ref={this.registerRef} className='ola-answer-linechart' />
        <TableDetail {...this.props} />
      </div>
    )
  }
}
