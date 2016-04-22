import React from 'react'
import { addFacet, removeFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import { parseRangeValues } from './../../utilities'

class Rating extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    gap: 20
  }

  handleFacet = (event) => {
    var { dispatch, facet } = this.props

    var min = parseInt(event.target.value, 10)
    var value = [min, min + facet.gap]

    if (event.target.checked) {
      dispatch(addFacet(facet, value))
    } else {
      dispatch(removeFacet(facet, value))
    }

    /* Search */

    dispatch(executeSearch())
  };

  render () {
    var { facet, selected, isCollapsed, toggleDisplay, gap } = this.props
    var { values } = facet

    /* Seleced - [1,2,3,4] => [ [1, 2], [3, 4]];*/

    var selectedArray = parseRangeValues(selected)
    var bounds = selectedArray.map((item) => parseInt(item[0]))
    var isSelected = (name) => bounds.indexOf(parseInt(name)) > -1
    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
        <div className='ola-facet-wrapper'>
          <div className='ola-facet-list'>
            {values.map((value, idx) => {
              var stars = []
              var normalized = Math.max(Math.ceil(parseInt(value.name) / gap), 0) + 1
              var isActive = isSelected(value.name)
              var labelKlass = classNames({
                'ola-checkbox ola-checkbox-label': true,
                'ola-checkbox-active': isActive
              })

              for (var i = 0; i < normalized; i++) {
                stars.push(<em key={i} className='ion ion-ios-star ola-rating-active' />)
              }

              return (
                <label
                  key={idx}
                  className={labelKlass}
                  >
                  <input
                    type='checkbox'
                    value={value.name}
                    onChange={this.handleFacet}
                    checked={isActive}
                  />
                  {stars}
                  <span className='ola-search-facet-count'>
                    {value.count}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = FacetToggle(Rating)
