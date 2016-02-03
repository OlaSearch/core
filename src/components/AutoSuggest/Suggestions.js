import React from 'react';
import SnippetDefault from './../Snippets/Default';
import SearchResults from './../SearchResults';

const Suggestions = (props) => {
		
	var {
		results,			
		dispatch,
		bookmarks,
		components
	} = props;
	
	return (
		<div className="ola-suggestions-wrapper">			
			<SearchResults isAutosuggest = { true }  { ...props } />
		</div>
	)

};

Suggestions.propTypes = {
	results: React.PropTypes.array,
	dispatch: React.PropTypes.func.isRequired,
	bookmarks: React.PropTypes.array
}


module.exports = Suggestions