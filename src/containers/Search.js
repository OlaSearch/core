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
  ProgressBar,
  AnswerToken,
  Answer,
  Sort
} from '@olasearch/core'
import AlternateResults from '@olasearch/core/lib/components/Widgets/AlternateResults'

class Search extends React.Component {
  componentDidMount () {
    this.props.dispatch(
      Actions.Search.initSearch({ config: this.props.config })
    )
  }
  render () {
    var { dispatch, AppState, QueryState, components, Device } = this.props

    var {
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

    var {
      q,
      facet_query,
      page,
      per_page,
      referrer,
      isSearchActive
    } = QueryState

    var { isPhone, isTablet } = Device

    // console.log(JSON.stringify({
    //   query: q,
    //   docs: results.map(({ content, id }) => ({
    //     content,
    //     id
    //   }))
    // }))

    return (
      <div>
        <SearchBar
          q={q}
          showAlert={false}
          showHelp
          wordSuggestion={filterInAutoComplete}
        />

        <SelectedFilters
          facets={facet_query}
          dispatch={dispatch}
          referrer={referrer}
          grouped={false}
        />

        <AnswerToken />

        <ContentWrapper>
          <Sidebar>
            <SearchFilters
              facets={facets}
              selected={facet_query}
              dispatch={dispatch}
            />
          </Sidebar>

          <SearchContent>
            {/* <Alert />

            <AddAlert q={q} /> */}

            <FilterButton />

            <Sort />

            <SearchTitle
              totalResults={totalResults}
              page={page}
              perPage={per_page}
              isLoading={isLoading}
              isPhone={isPhone}
            />

            <ProgressBar />

            <TermSuggestion />

            <SpellSuggestion
              suggestions={spellSuggestions}
              totalResults={totalResults}
              dispatch={this.props.dispatch}
            />

            <Answer answer={answer} mc={mc} isLoading={isLoadingAnswer} />

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

            <AlternateResults />

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
