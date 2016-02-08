import React from 'react';

const HistoryItem = ( { history }) => {

	return (
		<div className="ola-module-item">
			<a href={history.url}>{history.q}</a>			
			{history.facets.map( (facet, idx) =>  <span key= {idx} className="ola-search-facet-count">{facet}</span> )}
		</div>
	)
};

module.exports = HistoryItem