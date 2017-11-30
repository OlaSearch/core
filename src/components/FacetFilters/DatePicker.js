import React from 'react'
import PropTypes from 'prop-types'
import { replaceFacet, executeSearch } from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import DateParser from './../../utilities/dateParser'
import classNames from 'classnames'
import DatePicker from 'react-pikaday-datepicker'
import { connect } from 'react-redux'

const DATE_FORMAT = 'DD-MM-YYYY'
const DATE_FORMAT_MOBILE = 'YYYY-MM-DD'
class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fromDate: '01-01-2017',
      toDate: '01-01-2017',
      minDate: null,
      maxDate: null
    }
  }

  static defaultProps = {
    dateLabels: [
      {
        label: 'This year',
        id: 'current_year'
      },
      {
        label: 'Last year',
        id: 'last_year'
      },
      {
        label: 'Last 3 years',
        id: 'last_3_years'
      },
      {
        label: 'Last 5 years',
        id: 'last_5_years'
      }
    ]
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    facet: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired
  };

  getDateFormat = () => {
    return this.props.isPhone ? DATE_FORMAT_MOBILE : DATE_FORMAT
  };

  onCustomChange = () => {
    let fromDate = DateParser.toUTC(this.state.fromDate, this.getDateFormat())
    let toDate = DateParser.toUTC(this.state.toDate, this.getDateFormat())
    let { facet, dispatch } = this.props

    dispatch(replaceFacet(facet, [ fromDate, toDate ]))
    dispatch(executeSearch())
  };
  onFromChange = (date, event) => {
    this.setState({
      fromDate: this.format(date)
    }, this.onCustomChange)
  };
  onToChange = (date) => {
    this.setState({
      toDate: this.format(date)
    }, this.onCustomChange)
  };

  onDateSelect = (type) => {
    let fromDate
    let toDate
    let year
    let { facet, dispatch } = this.props
    let { dateFormat = null } = facet

    switch (type) {
      case 'current_year':
        year = (new Date()).getFullYear()
        fromDate = new Date(year, 0, 1).getTime()
        toDate = new Date(year, 11, 31).getTime()
        break
      case 'last_year':
        year = (new Date()).getFullYear() - 1
        fromDate = new Date(year, 0, 1).getTime()
        toDate = new Date(year, 11, 31).getTime()
        break
      case 'last_3_years':
        year = (new Date()).getFullYear()
        fromDate = new Date(year - 2, 0, 1).getTime()
        toDate = new Date(year, 11, 31).getTime()
        break
      case 'last_5_years':
        year = (new Date()).getFullYear()
        fromDate = new Date(year - 5, 0, 1).getTime()
        toDate = new Date(year, 11, 31).getTime()
        break
    }

    fromDate = dateFormat ? DateParser.toUTC(fromDate) : fromDate
    toDate = dateFormat ? DateParser.toUTC(toDate) : toDate

    dispatch(replaceFacet(facet, [ fromDate, toDate ]))
    dispatch(executeSearch())
  };

  format = (date) => {
    return DateParser.format(DateParser.parse(date), this.getDateFormat())
  };
  getMinMaxValue = (props) => {
    let { selected, facet } = props
    let [ fromDate, toDate ] = selected && selected.length === 1 ? selected[0] : selected
    let { values } = facet
    let dates = values.map((value) => value.name)
    /* Convert dates to (getTime) */
    dates = dates.map((d) => DateParser.parse(d).getTime())
    let min = dates.length ? Math.min.apply(this, dates) : 0
    let max = dates.length ? Math.max.apply(this, dates) : 0

    return {
      min,
      max,
      fromDate,
      toDate
    }
  };
  updateDate = (props) => {
    let { min, max, fromDate, toDate } = this.getMinMaxValue(props)
    this.setState({
      fromDate: this.format(fromDate || min),
      toDate: this.format(toDate || max)
    })
  }
  componentDidMount () {
    this.updateDate(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.updateDate(nextProps)
  }
  parseDate = (dateString, onlyYear) => {
    const parts = dateString.split('-')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1] - 1, 10)
    const year = parseInt(parts[2], 10)
    return onlyYear & onlyYear === true ? year : new Date(year, month, day)
  }
  toDateString = (date, format) => {
    return DateParser.format(date, this.getDateFormat())
  };

  onMobileFromChange = (event) => {
    this.onFromChange(event.target.value)
  };
  onMobileToChange = (event) => {
    this.onToChange(event.target.value)
  };

  render () {
    let {
      facet,
      dateLabels,
      isCollapsed,
      toggleDisplay,
      isPhone
    } = this.props

    let { values } = facet

    /* Check if dates exists */
    if (!values.length) return null

    let klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })
    let yearRange = 20
    let fromDate = DateParser.parse(this.state.fromDate, this.getDateFormat())
    let toDate = DateParser.parse(this.state.toDate, this.getDateFormat())
    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <ul className='ola-date-list'>
            {dateLabels.map((date) => {
              return (
                <li key={date.id}>
                  <DateLabel
                    value={date.id}
                    label={date.label}
                    onSelect={this.onDateSelect}
                  />
                </li>
              )
            })}
            <li className='ola-date-custom'>
              <label className='ola-btn-date-select'>Custom</label>
              <div className='ola-date-custom-input'>
                <div className='ola-label ola-label-date'>
                  <span>From</span>
                  {isPhone
                    ? <input
                      type='date'
                      value={DateParser.format(fromDate, DATE_FORMAT_MOBILE)}
                      onChange={this.onMobileFromChange}
                      max={DateParser.format(toDate, DATE_FORMAT_MOBILE)}
                      />
                    : <DatePicker
                      format={DATE_FORMAT}
                      onChange={this.onFromChange}
                      parse={this.parseDate}
                      toString={this.toDateString}
                      value={fromDate}
                      yearRange={yearRange}
                      maxDate={toDate}
                      />
                  }
                </div>
                <div className='ola-label ola-label-date'>
                  <span>To</span>
                  {isPhone
                    ? <input
                      type='date'
                      value={DateParser.format(toDate, DATE_FORMAT_MOBILE)}
                      onChange={this.onMobileToChange}
                      max={DateParser.format(fromDate, DATE_FORMAT_MOBILE)}
                      />
                    : <DatePicker
                      format={DATE_FORMAT}
                      parse={this.parseDate}
                      toString={this.toDateString}
                      onChange={this.onToChange}
                      value={toDate}
                      yearRange={yearRange}
                      minDate={fromDate}
                      />
                  }
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
    onSelect(value)
  }

  return (
    <button
      className='ola-btn-unstyled ola-btn-date-select'
      onClick={handleClick}
      >{label}</button>
  )
}

function mapStateToProps (state) {
  return {
    isPhone: state.Device.isPhone || state.Device.isTablet
  }
}

module.exports = connect(mapStateToProps, null)(withFacetToggle(DateRange))
