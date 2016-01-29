import React from 'react';

const TermSuggestion = (props) => {
		
	var {
		term
	} = props;

	if(!term) return <noscript />;

	return (
		<div className="ola-term-suggestion">
			Showing results for <strong>{term}</strong>
		</div>
	)
		
};

module.exports = TermSuggestion;