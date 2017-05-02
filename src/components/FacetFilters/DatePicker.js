import React from 'react'
import PropTypes from 'prop-types'
import { replaceFacet, executeSearch } from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import DateParser from './../../utilities/dateParser'
import classNames from 'classnames'
import Flatpickr from 'flatpickr'

class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isCustomDateActive: false
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

  onCustomChange = () => {
    let fromDate = DateParser.toUTC(this.fromRef.value)
    let toDate = DateParser.toUTC(this.toRef.value)
    let { facet, dispatch } = this.props

    dispatch(replaceFacet(facet, [ fromDate, toDate ]))
    dispatch(executeSearch())
  };

  activateCustomDateEntry = () => {
    this.setState({
      isCustomDateActive: !this.state.isCustomDateActive
    })
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
    return DateParser.format(DateParser.parse(date), 'YYYY-MM-DD')
  };
  registerFromRef = (input) => {
    if (!input) return
    this.fromRef = input
    this.fromPicker = new Flatpickr(input)
  };
  registerToRef = (input) => {
    if (!input) return
    this.toRef = input
    this.toPicker = new Flatpickr(input)
  };

  componentWillUnmount () {
    /* Destroy picker */
    this.fromPicker.destroy()
    this.toPicker.destroy()
  }

  render () {
    let {
      facet,
      selected,
      dateLabels,
      isCollapsed,
      toggleDisplay
    } = this.props

    let { isCustomDateActive } = this.state
    let [ from, to ] = selected && selected.length === 1 ? selected[0] : selected
    let { values } = facet
    let dates = values.map((value) => value.name)
    /* Convert dates to (getTime) */
    dates = dates.map((d) => DateParser.parse(d).getTime())

    /* Check if dates exists */
    if (!dates.length) return null

    let min = Math.min.apply(this, dates)
    let max = Math.max.apply(this, dates)
    let defaultFrom = from || min
    let defaultTo = to || max
    let klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    let customKlass = classNames('ola-date-custom', {
      'ola-custom-active': isCustomDateActive
    })
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
            <li className={customKlass}>
              <button
                className='ola-btn-unstyled ola-btn-date-select'
                onClick={this.activateCustomDateEntry}
                >Custom</button>
              <div className='ola-date-custom-input'>
                <label className='ola-label ola-label-date'>
                  <span>From</span>
                  <input
                    type='text'
                    value={this.format(defaultFrom)}
                    min={this.format(min)}
                    ref={this.registerFromRef}
                    onChange={this.onCustomChange}
                  />
                </label>
                <label className='ola-label ola-label-date'>
                  <span>To</span>
                  <input
                    type='text'
                    ref={this.registerToRef}
                    max={this.format(max)}
                    value={this.format(defaultTo)}
                    onChange={this.onCustomChange}
                  />
                </label>
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
const DateLabel = ({ label, value, onSelect }) => {
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

module.exports = withFacetToggle(DateRange)
