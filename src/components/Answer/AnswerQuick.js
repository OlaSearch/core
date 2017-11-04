import React from 'react'
import { sanitizeNumbers, createHTMLMarkup } from './../../utilities'
import { SparkLine } from './../../utilities/sparkline'
import classNames from 'classnames'

/**
 * Generic answer template
 */
const Generic = ({ card }) => {
  return <span className='ola-answer-quick-title'>{card.title}</span>
}

/**
 * Line chart
 */
class LineChart extends React.Component {
  static defaultProps = {
    width: 100,
    height: 15
  }
  componentDidMount () {
    this.sparkline = new SparkLine()
    this.buildSpark()
  }
  buildSpark = () => {
    let values = this.getData()
    if (values && values[0].length > 1 && this.el) {
      this.sparkline.init({
        el: this.el,
        data: values[0],
        endpoint: false,
        color: '#0081bf',
        style: 'line',
        height: this.props.height,
        width: this.props.width
      })
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.card !== this.props.card
  }
  componentDidUpdate () {
    this.buildSpark()
  }
  registerRef = (el) => {
    this.el = el
  };
  getData = () => {
    let { card: { record_data: recordData, record_keys: recordKeys } } = this.props
    recordKeys = recordKeys.filter((_, idx) => idx !== 0)
    return recordData.map((item) => {
      return recordKeys.map((key) => sanitizeNumbers(item[key]))
    })
  };
  shouldComponentUpdate (nextProps) {
    return this.props.card.record_data !== nextProps.card.record_data
  }
  getChartLabel = () => {
    let lastKey = this.props.card.record_keys[this.props.card.record_keys.length - 1]
    let label = this.props.card.record_data[0][lastKey]
    let unit = this.props.card.record_units ? this.props.card.record_units['data'] : ''

    return `<span class='ola-answer-quick-value'>${label}${unit}</span> (${lastKey})`
  };
  render () {
    let values = this.getData()
    let { card: { record_units: recordUnits } } = this.props
    if (values && values.length > 1) return null
    if (values && values[0].length > 1) {
      let chartLabel = this.getChartLabel()
      return (
        <div className='ola-answer-quick-chart'>
          <canvas className='ola-answer-quick-canvas' ref={this.registerRef} width={this.props.width} height={this.props.height} />
          <div className='ola-answer-quick-chart-label'>
            <div
              dangerouslySetInnerHTML={createHTMLMarkup(chartLabel)}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className='ola-answer-quick-singleData'>
          <span className='ola-answer-quick-value'>
            {values[0].map((v) => v)}
          </span>
          <span className='ola-answer-quick-unit'>{recordUnits.data}</span>
        </div>
      )
    }
  }
}

/**
 * List template
 */
const List = ({ card }) => {
  let { elements } = card
  function handleClick (e) {
    e.stopPropagation()
  }
  return (
    <div className='ola-answer-quick-list'>
      {elements.map(({ subtitle, buttons }, idx) => {
        return (
          <div key={idx} className='ola-answer-quick-listItem'>
            <p className='ola-answer-quick-subtitle'>{subtitle}</p>
            <div className='ola-answer-quick-buttonList'>
              {buttons.map((button, i) => {
                return (
                  <a
                    key={i}
                    href={button.url}
                    className='ola-answer-quick-button'
                    onClick={handleClick}
                  >
                    {button.title}
                  </a>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Template switcher
 */
function getTemplate (card) {
  switch (card.template) {
    case 'line_chart':
      return <LineChart card={card} />
    case 'list':
      return <List card={card} />
    default:
      return <Generic card={card} />
  }
}

const AnswerQuick = ({ answer, onSelect }) => {
  if (!answer) return null
  let { card } = answer
  let { template } = card
  let klass = classNames('ola-answer-quick', `ola-answer-quick-${template}`)
  return (
    <div className={klass} onClick={onSelect}>
      {getTemplate(card)}
    </div>
  )
}

module.exports = AnswerQuick
