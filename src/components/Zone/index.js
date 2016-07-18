import React from 'react'
import { replaceFacet, removeFacet } from './../../actions/Search'
import { addFacet as addFacetAutoSuggest, removeFacet as removeFacetAutoSuggest } from './../../actions/AutoSuggest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import flatten from 'ramda/src/flatten'

/* Create a zone facet */
const CREATE_ZONE_FACET = (name) => ({ name, zone: true, type: 'string' })

class Zone extends React.Component {
  onChange = (event) => {
    let { value } = event.target
    let { onChange, replaceFacet, removeFacet } = this.props
    let facet = CREATE_ZONE_FACET(this.context.config.zone.filter)
    if (value) {
      replaceFacet(facet, value)
    } else {
      removeFacet(facet)
    }
    onChange && onChange(facet, value)
  };

  static contextTypes = {
    config: React.PropTypes.object
  };

  static defaultProps = {
    selected: []
  };

  render () {
    let { zone: { defaultValue, values, filter } } = this.context.config
    let { selected } = this.props
    let selectedValues = flatten(selected.filter((item) => item.name === filter).map((item) => item.selected))
    let selectedValue = selectedValues.length ? selectedValues[0] : defaultValue

    return (
      <div className='ola-zone'>
        <label className='ola-zone-label'>Select zone</label>
        <select
          onChange={this.onChange}
          value={selectedValue}
        >
          {values.map((zone) => {
            let { name, displayName } = zone
            return <option key={name} value={name}>{displayName}</option>
          })}
        </select>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    selected: ownProps.isAutosuggest ? state.AutoSuggest.facet_query : state.QueryState.facet_query
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  let actions
  if (ownProps.isAutosuggest) {
    actions = {
      replaceFacet: addFacetAutoSuggest,
      removeFacet: removeFacetAutoSuggest
    }
  } else {
    actions = {
      replaceFacet,
      removeFacet
    }
  }
  return bindActionCreators(actions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Zone)
