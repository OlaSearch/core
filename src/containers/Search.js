import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Alert,
  AddAlert,
  Actions,
  AutoComplete,
  SearchResults,
  SearchFooter,
  SearchFilters,
  SelectedFilters,
  Decorators,
  SearchTitle,
  NoResults,
  SpellSuggestion,
  TermSuggestion,
  Sidebar,
  FilterButton,
  ErrorMessage,
  SearchBar,
  ContentWrapper,
  SearchContent,
  SearchHeader,
  ProgressBar,
  SlotSuggestion,
  Answer,
  Sort
} from '@olasearch/core'

class Search extends React.Component {
  componentDidMount () {
    this.props.dispatch(
      Actions.Search.initSearch({ config: this.props.config })
    )
  }
  render () {
    const { dispatch, AppState, QueryState, components, Device } = this.props

    const {
      results,
      facets,
      isLoading,
      suggestedTerm,
      spellSuggestions,
      bookmarks,
      totalResults,
      error,
      answer,
      mc,
      isLoadingAnswer,
      isSidebarOpen,
      filterInAutoComplete
    } = AppState

    const {
      q,
      facet_query,
      page,
      per_page,
      referrer,
      isSearchActive
    } = QueryState

    const { isPhone, isTablet } = Device

    return (
      <div>
        <SearchBar q={q} wordSuggestion={filterInAutoComplete} />

        <SelectedFilters
          facets={facet_query}
          dispatch={dispatch}
          referrer={referrer}
          grouped={false}
        />

        <SlotSuggestion />

        <ContentWrapper>
          <Sidebar>
            <SearchFilters
              facets={facets}
              selected={facet_query}
              dispatch={dispatch}
            />
          </Sidebar>

          <SearchContent>
            <SearchHeader totalResults={totalResults}>
              <SearchTitle
                totalResults={totalResults}
                page={page}
                perPage={per_page}
                isLoading={isLoading}
                isPhone={isPhone}
              />
              <Sort />
            </SearchHeader>

            <ProgressBar />

            <TermSuggestion />

            <SpellSuggestion
              suggestions={spellSuggestions}
              totalResults={totalResults}
              dispatch={this.props.dispatch}
            />

            <Answer
              answer={answer}
              mc={mc}
              isLoading={isLoadingAnswer}
              results={results}
            />

            <ErrorMessage error={error} />

            <SearchResults
              results={this.props.AppState.results}
              bookmarks={this.props.AppState.bookmarks}
              dispatch={this.props.dispatch}
            />

            <NoResults
              q={q}
              isLoading={isLoading}
              suggestedTerm={suggestedTerm}
              facets={facet_query}
              totalResults={totalResults}
              dispatch={dispatch}
            />

            <SearchFooter
              totalResults={totalResults}
              currentPage={page}
              perPage={per_page}
              dispatch={dispatch}
              isPhone={isPhone}
              isLoading={isLoading}
            />
          </SearchContent>
        </ContentWrapper>
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

export default connect(mapStateToProps)(
  Decorators.withConfig(Decorators.withRoute(Search))
)
