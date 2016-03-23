import React from 'react'
import { replaceFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import DateParser from './../../utilities/dateParser'
import classNames from 'classnames'

class DateRange extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    facet: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired
  };

  onChange = () => {
    let fromDate = new Date(this.refs.fromDate.value).getTime()
    let toDate = new Date(this.refs.toDate.value).getTime()

    let { facet, dispatch } = this.props

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

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <label className='ola-label'>
            From
            <input
              type='date'
              value={this.format(defaultFrom)}
              min={this.format(min)}
              ref='fromDate'
              onChange={this.onChange}
            />
          </label>
          <label className='ola-label'>
            To
            <input
              type='date'
              ref='toDate'
              max={this.format(max)}
              value={this.format(defaultTo)}
              onChange={this.onChange}
            />
          </label>
        </div>
      </div>
    )
  }
}

module.exports = FacetToggle(DateRange)
