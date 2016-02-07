import React from 'react';
import { connect } from 'react-redux';
import listensToClickOutside from 'react-onclickoutside/decorator';
import { updateQueryTerm, executeAutoSuggest, clearQueryTerm, closeAutoSuggest,	addFacet } from './../../actions/AutoSuggest';
import Suggestions from './Suggestions';
import Input from './Input';
import TermSuggestion from './../SpellSuggestions/TermSuggestion';
import SpellSuggestion from './../SpellSuggestions/SpellSuggestion';
import FacetSuggestion from './FacetSuggestion';
import { buildQueryString } from './../../services/urlSync';

class AutoSuggest extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			activeSuggest: 0
		}
	}
	
	static propTypes = {
		AutoSuggest: React.PropTypes.object.isRequired,
		bookmarks: React.PropTypes.array,
		showFacetSuggestions: React.PropTypes.bool,
		dispatch: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func
	};

	static defaultProps = {
		showBookmarks: true,
		searchUrl: 'search.html?',
		showFacetSuggestions: false,
	};

	handleClickOutside = (event) => {

		var { isOpen } = this.props.AutoSuggest;
		
		if(isOpen){

			this.props.dispatch(closeAutoSuggest())

		}
		
	};
	
	onChange = (term) => {

		var { dispatch } = this.props;

		if(!term) {

			return dispatch(clearQueryTerm());
		}

		dispatch(updateQueryTerm(term));

		dispatch(executeAutoSuggest());
	};

	onClear = () => {

		this.props.dispatch(clearQueryTerm());

	};
	
	onSubmit = (event) => {

		this.handleViewAll();

		event && event.preventDefault();
	};

	handleViewAll = () => {

		var { q, facet_query } = this.props.AutoSuggest.query;

		var { searchUrl, dispatch, onSubmit } = this.props;

		dispatch(closeAutoSuggest())

		onSubmit && onSubmit.call(this, q)

		window.location.href = searchUrl + buildQueryString( { q: q, facet_query: facet_query })
	};

	render(){		
		var {
			dispatch,
			AutoSuggest,
			bookmarks,
			components,
			showFacetSuggestions,
		} = this.props;

		var {
			results,
			query,
			spellSuggestions,
			suggestedTerm,
			isOpen,
            totalResults,
            facets,
		} = AutoSuggest;

		var { q } = query;

		var klass = 'ola-suggestions' + (isOpen? '': ' js-hide');

		var shouldShowFacetSuggestions = showFacetSuggestions && !suggestedTerm && !spellSuggestions.length;

		return (
			<form className="ola-autosuggest" onSubmit = {this.onSubmit}>
				<div className="ola-autosuggest-container">
					<Input
						q = {q}
						onChange = {this.onChange}
						onClear = {this.onClear}
					/>

					<div className={klass}>						

						<TermSuggestion term = {suggestedTerm} />
				
						<SpellSuggestion 
							suggestions = {spellSuggestions} 
							onChange = {this.onChange}
							totalResults = {totalResults}
							dispatch = {dispatch}
						/>

						<div className="ola-suggestions-wrapper">

							{ shouldShowFacetSuggestions
								? <FacetSuggestion
										facets = { facets }
										query = { query }
										name = 'genres_sm'
										dispatch = { dispatch }
										onSubmit = { this.onSubmit }
										addFacet = { addFacet }
									/>
								: null
							}
							<Suggestions 
								results = {results} 
								isOpen = {isOpen}
								dispatch = {dispatch}
								bookmarks = {bookmarks}
								components = { components }
							/>
						</div>
						<a className="ola-autosuggest-all" onClick = {this.handleViewAll}>View all results</a>
					</div>
				</div>
			</form>
		)
	}
}

function mapStateToProps( state ){

	return {
		AutoSuggest: state.AutoSuggest,
		bookmarks: state.AppState.bookmarks,
	}
}

module.exports = connect( mapStateToProps )( listensToClickOutside( AutoSuggest ) )