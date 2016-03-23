import React from 'react';

const FacetSuggestion = ( props ) => {

	var { facets, query, name, addFacet, dispatch, onSubmit, limit } = props;

	var facet = facets.filter( item => item.name == name);
	var values = []
		.concat
		.apply([], facet.map( item => item.values))
		.splice(0, limit)

	var { q } = query;

	return (
		<div className="ola-facet-suggestions">
			{values.map( (value, idx) => {

				return (
					<a
						className="ola-facet-suggestion"
						key = { idx }
						tabIndex = {0}
						onClick = { () => {

							dispatch( addFacet(facet[0], value.name) )

							/* Prevent race condition */

							setTimeout( () => { onSubmit && onSubmit() }, 0)

						}}
						>
						<strong>{ q }</strong> in {value.name}
					</a>
				)
			})}
		</div>
	)
};

FacetSuggestion.defaultProps = {
	limit: 3
}

module.exports = FacetSuggestion