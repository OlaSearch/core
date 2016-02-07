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
		<SearchResults isAutosuggest = { true }  { ...props } />
	)

};

Suggestions.propTypes = {
	results: React.PropTypes.array,
	dispatch: React.PropTypes.func.isRequired,
	bookmarks: React.PropTypes.array
}


module.exports = Suggestions