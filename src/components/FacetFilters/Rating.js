import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import { parseRangeValues } from './../../utilities'

class RatingFilter extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired
  };

  handleFacet = (event) => {
    var { dispatch, facet } = this.props

    var min = parseInt(event.target.value, 10)
    var value = [min, min + facet.interval]

    if (event.target.checked) {
      dispatch(addFacet(facet, value))
    } else {
      dispatch(removeFacet(facet, value))
    }

    /* Search */

    dispatch(executeSearch())
  };
  isSelected = (bounds, name) => {
    /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]];*/
    return bounds.indexOf(parseInt(name)) > -1
  };
  render () {
    var { facet, isCollapsed, toggleDisplay } = this.props
    var { values, interval } = facet
    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]];*/
    var selectedArray = parseRangeValues(this.props.selected)
    var bounds = selectedArray.map((item) => parseInt(item[0]))

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <div className='ola-facet-list'>
            {values.map((value, idx) => {
              var stars = []
              var normalized = Math.max(Math.ceil(parseInt(value.name) / interval), 0) + 1
              var isActive = this.isSelected(bounds, value.name)
              var labelKlass = classNames({
                'ola-checkbox ola-checkbox-label': true,
                'ola-checkbox-active': isActive
              })

              for (var i = 0; i < normalized; i++) {
                stars.push(<em key={i} className='ion ion-ios-star ola-rating-active' />)
              }

              return (
                <label key={idx} className={labelKlass}>
                  <input
                    type='checkbox'
                    value={value.name}
                    onChange={this.handleFacet}
                    checked={isActive}
                  />
                  {stars}
                  <span className='ola-search-facet-count'>{value.count}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = withFacetToggle(RatingFilter)
