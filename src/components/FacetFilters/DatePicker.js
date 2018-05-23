import React from 'react'
import PropTypes from 'prop-types'
import { replaceFacet, executeSearch } from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import DateParser from './../../utilities/dateParser'
import {
  DATE_FORMAT_MOBILE,
  DEFAULT_DATE_FORMAT,
  DATEPICKER_YEAR_RANGE
} from './../../constants/Settings'
import classNames from 'classnames'
import DatePicker from 'react-pikaday-datepicker'
import { connect } from 'react-redux'
import FacetTitle from './common/FacetTitle'

function getMinMaxValue (props) {
  const { selected, facet } = props
  let [fromDate, toDate] =
    selected && selected.length === 1 ? selected[0] : selected
  const { values } = facet
  var dates = values.map((value) => value.name)
  /* Convert dates to (getTime) */
  dates = dates.map((d) => DateParser.parse(d).getTime())
  const min = dates.length ? Math.min.apply(this, dates) : 0
  const max = dates.length ? Math.max.apply(this, dates) : 0

  /**
   * Format date
   */
  if (fromDate) fromDate = DateParser.parse(fromDate).getTime()
  if (toDate) toDate = DateParser.parse(toDate).getTime()

  return {
    min,
    max,
    fromDate,
    toDate
  }
}

class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fromDate: null,
      toDate: null,
      minDate: null,
      maxDate: null,
      dateLabel: false
    }
  }

  static defaultProps = {
    dateLabels: [
      {
        label: 'This year',
        value: () => {
          const year = new Date().getFullYear()
          const fromDate = new Date(year, 0, 1).getTime()
          const toDate = new Date(year, 11, 31).getTime()
          return [fromDate, toDate]
        }
      },
      {
        label: 'Last year',
        value: () => {
          const year = new Date().getFullYear() - 1
          const fromDate = new Date(year, 0, 1).getTime()
          const toDate = new Date(year, 11, 31).getTime()
          return [fromDate, toDate]
        }
      },
      {
        label: 'Last 3 years',
        value: () => {
          const year = new Date().getFullYear()
          const fromDate = new Date(year - 2, 0, 1).getTime()
          const toDate = new Date(year, 11, 31).getTime()
          return [fromDate, toDate]
        }
      },
      {
        label: 'Last 5 years',
        value: () => {
          const year = new Date().getFullYear()
          const fromDate = new Date(year - 4, 0, 1).getTime()
          const toDate = new Date(year, 11, 31).getTime()
          return [fromDate, toDate]
        }
      }
    ]
  }

  static propTypes = {
    facet: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired
  }

  onCustomChange = () => {
    const fromDate = DateParser.toUTC(this.state.fromDate)
    const toDate = DateParser.toUTC(this.state.toDate)
    let { facet, replaceFacet, executeSearch } = this.props

    replaceFacet(facet, [fromDate, toDate])
    executeSearch()
  }
  onFromChange = (date, event) => {
    this.setState(
      {
        fromDate: date.getTime(),
        dateLabel: false
      },
      this.onCustomChange
    )
  }
  onToChange = (date) => {
    this.setState(
      {
        toDate: date.getTime(),
        dateLabel: false
      },
      this.onCustomChange
    )
  }

  onDateSelect = ([fromDate, toDate]) => {
    const { dispatch, replaceFacet, executeSearch, facet } = this.props
    this.setState({
      dateLabel: true
    })
    replaceFacet(facet, [DateParser.toUTC(fromDate), DateParser.toUTC(toDate)])
    executeSearch()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { min, max, fromDate, toDate } = getMinMaxValue(nextProps)
    if (fromDate !== prevState.fromDate || toDate !== prevState.toDate) {
      return {
        fromDate: fromDate || min,
        toDate: toDate || max,
        minDate: min,
        maxDate: max
      }
    }
    return null
  }
  parseDate = (dateString) => {
    const parts = dateString.split('-')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1] - 1, 10)
    const year = parseInt(parts[2], 10)
    return new Date(year, month, day)
  }
  toDateString = (date, format) => {
    return DateParser.format(date, DEFAULT_DATE_FORMAT)
  }

  onMobileFromChange = (event) => {
    this.onFromChange(DateParser.parse(event.target.value, DATE_FORMAT_MOBILE))
  }
  onMobileToChange = (event) => {
    this.onToChange(DateParser.parse(event.target.value, DATE_FORMAT_MOBILE))
  }

  render () {
    const { facet, dateLabels, isCollapsed, toggle, isPhone } = this.props
    let { fromDate, toDate, maxDate, minDate, dateLabel } = this.state
    const { values } = facet
    /* Check if dates exists */
    if (!values.length) return null
    const klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })
    /* Mobile dates */
    const fromDateMobile = DateParser.format(fromDate, DATE_FORMAT_MOBILE)
    const toDateMobile = DateParser.format(toDate, DATE_FORMAT_MOBILE)

    /* Parse dates */
    fromDate = DateParser.parse(fromDate)
    toDate = DateParser.parse(toDate)
    minDate = dateLabel ? fromDate : DateParser.parse(minDate)
    maxDate = dateLabel ? toDate : DateParser.parse(maxDate)

    return (
      <div className={klass}>
        <FacetTitle
          displayName={facet.displayName}
          toggle={toggle}
          isCollapsed={isCollapsed}
        />
        <div className='ola-facet-wrapper'>
          <ul className='ola-date-list'>
            {dateLabels.map((date, idx) => {
              return (
                <li key={idx}>
                  <DateLabel onSelect={this.onDateSelect} {...date} />
                </li>
              )
            })}
            <li className='ola-date-custom'>
              <div className='ola-date-custom-label'>Custom</div>
              <div className='ola-date-custom-input'>
                <div className='ola-label ola-label-date'>
                  <span>From</span>
                  {isPhone ? (
                    <input
                      type='date'
                      className='ola-text-input'
                      value={fromDateMobile}
                      onChange={this.onMobileFromChange}
                      max={DateParser.format(toDate, DATE_FORMAT_MOBILE)}
                    />
                  ) : (
                    <DatePicker
                      format={DEFAULT_DATE_FORMAT}
                      onChange={this.onFromChange}
                      parse={this.parseDate}
                      toString={this.toDateString}
                      value={fromDate}
                      yearRange={DATEPICKER_YEAR_RANGE}
                      maxDate={toDate}
                    />
                  )}
                </div>
                <div className='ola-label ola-label-date'>
                  <span>To</span>
                  {isPhone ? (
                    <input
                      type='date'
                      className='ola-text-input'
                      value={toDateMobile}
                      onChange={this.onMobileToChange}
                      max={DateParser.format(fromDate, DATE_FORMAT_MOBILE)}
                    />
                  ) : (
                    <DatePicker
                      format={DEFAULT_DATE_FORMAT}
                      parse={this.parseDate}
                      toString={this.toDateString}
                      onChange={this.onToChange}
                      value={toDate}
                      yearRange={DATEPICKER_YEAR_RANGE}
                      minDate={fromDate}
                    />
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

/**
 * Date label
 */
function DateLabel ({ label, value, onSelect }) {
  function handleClick () {
    onSelect(value())
  }

  return (
    <button className='ola-btn ola-btn-date-select' onClick={handleClick}>
      {label}
    </button>
  )
}

function mapStateToProps (state) {
  return {
    isPhone: state.Device.isPhone || state.Device.isTablet
  }
}

export default connect(mapStateToProps, { replaceFacet, executeSearch })(
  withToggle(DateRange)
)
