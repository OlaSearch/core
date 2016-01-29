import React from 'react';
import SnippetDefault from './../Snippets/Default';
import { getMatchingSnippet } from './../../utilities';

export default class SearchResults extends React.Component{

	constructor(props){
		super(props)
	}

	static propTypes = {
		results: React.PropTypes.array.isRequired,
		bookmarks: React.PropTypes.array,
		dispatch: React.PropTypes.func,
	};

	static contextTypes = {
		config: React.PropTypes.object
	};

	shouldComponentUpdate( nextProps ){

		return (
			this.props.results != nextProps.results
			|| this.props.bookmarks != nextProps.bookmarks						
		)
	}

	render(){

		let { results, dispatch, bookmarks, components, isAutocomplete } = this.props;		
		let { snippetRules, defaultSnippet } = this.context.config;		

		return (
			<div className="ola-results">
				{results.map( (result, idx) => {

					let OlaSnippet = getMatchingSnippet( snippetRules , result ) || defaultSnippet || SnippetDefault
					
					return (
						<OlaSnippet
							result = {result} 
							key = {idx} 
							dispatch = {dispatch} 
							bookmarks = {bookmarks}
							isAutocomplete = { isAutocomplete }
						/>
					)
					
				})}
			</div>
		)

	}
}