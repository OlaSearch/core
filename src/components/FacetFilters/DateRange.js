import React from 'react'
import { replaceFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import DateParser from './../../utilities/dateParser'
import classNames from 'classnames'

class DateRange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isCustomActive: false
    }
  }

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    facet: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired
  };

  onCustomChange = () => {
    let fromDate = new Date(this.refs.fromDate.value).getTime()
    let toDate = new Date(this.refs.toDate.value).getTime()

    let { facet, dispatch } = this.props

    dispatch(replaceFacet(facet, [ fromDate, toDate ]))

    dispatch(executeSearch())
  };

  activateCustom = () => {
    this.setState({
      isCustomActive: !this.state.isCustomActive
    })
  };

  onDateSelect = (type) => {
    let fromDate
    let toDate
    let year
    let { facet, dispatch } = this.props

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

    dispatch(replaceFacet(facet, [ fromDate, toDate ]))

    dispatch(executeSearch())
  };

  format = (date) => {
    var d = new Date(parseInt(date))

    return DateParser.format(d, 'YYYY-MM-DD')
  };

  render () {
    let {
      facet,
      selected,
      isCollapsed,
      toggleDisplay
    } = this.props

    let { isCustomActive } = this.state

    let [ from, to ] = selected
    let { values } = facet
    let dates = values.map((value) => value.name)
    let min = Math.min.apply(this, dates)
    let max = Math.max.apply(this, dates)

    let defaultFrom = from || min
    let defaultTo = to || max

    let klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    let customKlass = classNames('ola-date-custom', {
      'ola-custom-active': isCustomActive
    })

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <ul className="ola-date-list">
            <li>
              <button
                className="ola-btn-unstyled ola-btn-date-select"
                onClick={(event) => {
                  this.onDateSelect('current_year')
                }}
                >This year</button>
            </li>
            <li>
              <button
                className="ola-btn-unstyled ola-btn-date-select"
                onClick={(event) => {
                  this.onDateSelect('last_year')
                }}
                >Last year</button>
            </li>
            <li>
              <button
                className="ola-btn-unstyled ola-btn-date-select"
                onClick={(event) => {
                  this.onDateSelect('last_3_years')
                }}
                >Last 3 years</button>
            </li>
            <li>
              <button
                className="ola-btn-unstyled ola-btn-date-select"
                onClick={(event) => {
                  this.onDateSelect('last_5_years')
                }}
                >Last 5 years</button>
            </li>
            <li className={customKlass}>
              <button
                className="ola-btn-unstyled ola-btn-date-select"
                onClick = {this.activateCustom}
                >Custom</button>
              <div className="ola-date-custom-input">
                <label className='ola-label ola-label-date'>
                  <span>From</span>
                  <input
                    type='date'
                    value={this.format(defaultFrom)}
                    min={this.format(min)}
                    ref='fromDate'
                    onChange={this.onCustomChange}
                  />
                </label>
                <label className='ola-label ola-label-date'>
                  <span>To</span>
                  <input
                    type='date'
                    ref='toDate'
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

module.exports = FacetToggle(DateRange)
