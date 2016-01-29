import React from 'react';
import { removeAllFacets, executeSearch } from './../../actions/Search';

const ClearAllFacets = (props) => {

	var { dispatch, selected } = props;

	if(!selected.length) return <noscript />;

	return (

		<button
			type="button"
			className="ola-link-clear-all-filters"
			onClick = {() => {
					
					dispatch( removeAllFacets() )
					dispatch( executeSearch() )
			
			}}
		>Clear all filters</button>
	)
};

module.exports = ClearAllFacets;