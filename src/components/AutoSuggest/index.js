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
import scrollIntoView from 'dom-scroll-into-view';

class AutoSuggest extends React.Component{

	constructor(props){
		super(props)
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
		classNames: '.ola-snippet, .ola-facet-suggestion',
		activeClassName: 'ola-active',
	};

	handleClickOutside = (event) => {

		var { isOpen } = this.props.AutoSuggest;
		var { dispatch } = this.props;
		
		if(isOpen){

			dispatch(closeAutoSuggest())

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

	onMove = ( direction ) => {

		let { classNames, activeClassName } = this.props;
		let { suggestionsContainer } = this.refs;
		let fullClass = '.' + classNames;
		let fullActiveClass = '.' + activeClassName;

		let nodes = suggestionsContainer.querySelectorAll(classNames);
		
		if(!nodes.length) return;

		let target = suggestionsContainer.querySelector(fullActiveClass);
		let index = target? [].indexOf.call(nodes, target) : -1 ;
		let next;
		var clearActive = ( nodes ) => {
			for(let i = 0; i < nodes.length; i++){
				nodes[i].classList.remove(activeClassName)
			}
		}
		
		switch(direction){

			case 'up':
				clearActive(nodes)
				next = nodes[Math.max(0, --index)]
				next.classList.add(activeClassName)
				break;
			case 'down':
				clearActive(nodes)
				next = nodes[Math.min(nodes.length - 1, ++index)]
				next.classList.add(activeClassName);
				break;
		}
		
		scrollIntoView( next, suggestionsContainer, { onlyScrollIfNeeded: true})
	};
	
	onSubmit = (event) => {

		/* Check if there is active class */

		let target = this.refs.suggestionsContainer.querySelector('.' + this.props.activeClassName);

		if(target){
			let linkTarget = target.nodeName == 'A'? target: target.querySelector('a'); 
			if(linkTarget) linkTarget.click();
			return ;
		}


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
			<div className="ola-autosuggest">
				<div className="ola-autosuggest-container">
					<Input
						q = {q}
						onChange = {this.onChange}
						onClear = {this.onClear}
						onMove = { this.onMove}
						onSubmit = { this.onSubmit }
					/>

					<div className={klass}>						

						<TermSuggestion term = {suggestedTerm} />
				
						<SpellSuggestion 
							suggestions = {spellSuggestions} 
							onChange = {this.onChange}
							totalResults = {totalResults}
							dispatch = {dispatch}
						/>

						<div className="ola-suggestions-wrapper" ref="suggestionsContainer">

							{ shouldShowFacetSuggestions
								? <FacetSuggestion
										facets = { facets }
										query = { query }
										name = 'genres_sm'
										dispatch = { dispatch }
										onSubmit = { this.handleViewAll }
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
			</div>
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