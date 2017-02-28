/* global google */
import React from 'react'

export default class AnswerBarChart extends React.Component {
  componentDidMount () {
    google.charts.load('current', { packages: ['corechart'] })
    google.charts.setOnLoadCallback(this.drawChart)
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.data !== this.props.data
  }
  componentDidUpdate (prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart()
    }
  }
  drawChart = () => {
    let { data: { record_data, record_keys } } = this.props
    let keys = record_keys.map(({ title }) => title)
    var data = google.visualization.arrayToDataTable(
       [].concat([], [keys], record_data.slice(0, 8))
    )
    var view = new google.visualization.DataView(data)
    var options = {
      legend: { position: 'none' }
    }
    var chart = new google.visualization.ColumnChart(this.el)
    chart.draw(view, options)
  };
  registerEl = (el) => {
    this.el = el
  };
  render () {
    return (
      <div className='ola-answer-barchart'>
        <div ref={this.registerEl} />
      </div>
    )
  }
}
