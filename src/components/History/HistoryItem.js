import React from 'react';

const HistoryItem = ( { history, searchPageUrl }) => {

    var url = searchPageUrl + history.url;

	return (
		<div className="ola-module-item">
			<a href={url}>{history.q}</a>			
			{history.facets.map( (facet, idx) =>  <span key= {idx} className="ola-search-facet-count">{facet}</span> )}
		</div>
	)
};

module.exports = HistoryItem