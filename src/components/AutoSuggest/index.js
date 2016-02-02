import React from 'react';
import { connect } from 'react-redux';
import listensToClickOutside from 'react-onclickoutside/decorator';
import { updateQueryTerm, executeAutoSuggest, clearQueryTerm, closeAutoSuggest,	} from './../../actions/AutoSuggest';
import Suggestions from './Suggestions';
import Input from './Input';
import TermSuggestion from './../SpellSuggestions/TermSuggestion';
import SpellSuggestion from './../SpellSuggestions/SpellSuggestion';

class AutoSuggest extends React.Component{	
	
	static propTypes = {
		AutoSuggest: React.PropTypes.object.isRequired,
		bookmarks: React.PropTypes.array,
		dispatch: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func
	};

	static defaultProps = {
		showBookmarks: true,
		searchUrl: 'search.html?'
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

		event.preventDefault();
	};

	handleViewAll = () => {

		var { q } = this.props.AutoSuggest.query;

		var { searchUrl, dispatch, onSubmit } = this.props;

		dispatch(closeAutoSuggest())

		onSubmit && onSubmit.call(this, q)

		window.location.href = searchUrl + 'q=' + q
	};

	render(){

		var {
			dispatch,
			AutoSuggest,
			bookmarks,
			components,
		} = this.props;

		var {
			results,
			query,
			spellSuggestions,
			suggestedTerm,
			isOpen,
            totalResults,
		} = AutoSuggest;

		var klass = 'ola-suggestions' + (isOpen? '': ' js-hide');

		return (
			<form className="ola-autosuggest" onSubmit = {this.onSubmit}>
				<div className="ola-autosuggest-container">
					<Input
						q = {query.q}
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
						<Suggestions 
							results = {results} 
							isOpen = {isOpen}
							dispatch = {dispatch}
							bookmarks = {bookmarks}
							components = { components }
						/>
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