import React from 'react'
import { connect } from 'react-redux'
import InstantSearchForm from './../components/InstantSearchForm'
import SearchResults from './../components/SearchResults'
import SearchFilters from './../components/SearchFilters'
import SelectedFilters from './../components/SelectedFilters'
import Tabs from './../components/FacetFilters/Tabs'
import SearchTitle from './../components/SearchTitle'
import ClearAllFacets from './../components/Misc/ClearAllFacets'
import Error from './../components/Misc/Error'
import TermSuggestion from './../components/SpellSuggestions/TermSuggestion'
import SpellSuggestion from './../components/SpellSuggestions/SpellSuggestion'
import Sort from './../components/Sort'
import SearchFooter from './../components/SearchFooter'
import { OlaRoute } from './../decorators/OlaRoute'
import { initSearch } from './../actions/Search'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isSidebarOpen: false
    }
  }

  static contextTypes = {
    config: React.PropTypes.object
  };

  componentDidMount () {
    this.props.dispatch(initSearch({ config: this.context.config }))
  }

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  };

  render () {
    var {
      dispatch,
      AppState,
      QueryState,
      components,
      Device
    } = this.props

    var {
      results,
      facets,
      suggestedTerm,
      spellSuggestions,
      bookmarks,
      totalResults,
      error
    } = AppState

    var {
      q,
      facet_query,
      page,
      per_page,
      sort,
      referrer
    } = QueryState

    var {
      isPhone
    } = Device

    var {
      isSidebarOpen
    } = this.state

    var klassSearchContainer = classNames({
      'ola-search-container': true,
      'ola-sidebar-open': isSidebarOpen
    })

    var klassModal = classNames({
      'ola-modal-background': true,
      'ola-modal-hide': !isSidebarOpen,
      'ola-modal-show': isSidebarOpen
    })

    return (
      <div>
        <div className={klassModal} onClick={this.toggleSidebar} />
        <div className='ola-form-container ola-header-section'>

          <a href='index.html' className='ola-logo'></a>

          <InstantSearchForm
            q={q}
            dispatch={dispatch}
            spellSuggestions={spellSuggestions}
          />
        </div>

        <div className={klassSearchContainer}>

          <button type='button' className='ola-link-open-filter' onClick={this.toggleSidebar}></button>

          <div className='ola-sidebar'>

            <h3><FormattedMessage id='refineResults' /></h3>

            <ClearAllFacets
              dispatch={dispatch}
              selected={facet_query}
            />

            <SearchFilters
              facets={facets}
              selected={facet_query}
              dispatch={dispatch} />
          </div>

          <div className='ola-results-container'>
            <div className='ola-title-container'>
              <Sort
                dispatch={dispatch}
                selected={sort}
              />

              <SearchTitle
                totalResults={totalResults}
                page={page}
                perPage={per_page}
              />

              <TermSuggestion
                term={suggestedTerm}
                q={q}
                />

              <SpellSuggestion
                suggestions={spellSuggestions}
                totalResults={totalResults}
                dispatch={dispatch}
              />
            </div>

            <Tabs
              facets={facets}
              dispatch={dispatch}
              selected={facet_query}
            />

            <SelectedFilters
              facets={facet_query}
              dispatch={dispatch}
              referrer={referrer}
            />

            <Error
              error={error}
            />

            <SearchResults
              q={q}
              results={results}
              bookmarks={bookmarks}
              dispatch={dispatch}
              components={components}
            />

            <SearchFooter
              totalResults={totalResults}
              currentPage={page}
              perPage={per_page}
              dispatch={dispatch}
              isPhone={isPhone}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    AppState: state.AppState,
    QueryState: state.QueryState,
    Device: state.Device
  }
}

module.exports = connect(mapStateToProps)(OlaRoute(Search))
