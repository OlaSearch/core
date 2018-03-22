import React from 'react'
import { connect } from 'react-redux'
import { executeSearch } from './../../actions/Search'
import SearchResults from './../SearchResults'
import PropTypes from 'prop-types'
import withConfig from './../../decorators/withConfig'
import { getFieldLabel } from './../../utilities'

class AlternateResults extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      response: {},
      facetQuery: props.facetQuery
    }
  }
  componentDidUpdate (prevProps) {
    let { facetQuery } = this.props

    if (
      !this.props.isLoading &&
      this.props.totalResults === 0 &&
      this.props.facetQuery.length > 1 &&
      typeof this.state.response.totalResults ===
        'undefined' /* Only search once */
    ) {
      let lastFacet = facetQuery[facetQuery.length - 1]['name']
      this.props
        .executeSearch(
          {
            extraParams: {
              facet_query: [],
              skip_facet_fields: [lastFacet]
            }
          },
          {
            shouldDispatchActions: false
          }
        )
        .then((response) => {
          this.setState({
            response
          })
        })
    }
  }
  render () {
    let { totalResults, facetQuery } = this.props
    let { response } = this.state
    let { results, totalResults: newTotalResults } = response
    if (!newTotalResults || this.props.facetQuery.length <= 1) return null
    let lastFacet = facetQuery[facetQuery.length - 1]['name']
    let { fieldLabels } = this.props.config
    /**
     * Steps
     * 1. Check if query returned zero results
     * 2. Skip 1 filter at a time
     */
    return (
      <div className='ola-alternate-results'>
        <p>
          But, we found {newTotalResults} results if we remove{' '}
          <span>{getFieldLabel(lastFacet, fieldLabels)}</span> filter.
        </p>
        <SearchResults results={results} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    totalResults: state.AppState.totalResults,
    isLoading: state.AppState.isLoading,
    facetQuery: state.QueryState.facet_query
  }
}

export default connect(mapStateToProps, { executeSearch })(
  withConfig(AlternateResults)
)
