import React from 'react';
import Default from './FacetFilters/Default';
import FacetCheckbox from './FacetFilters/Checkbox';
import Range from './FacetFilters/Range';
import Rating from './FacetFilters/Rating';
import FacetBoolean from './FacetFilters/Boolean';
import DateRange from './FacetFilters/DateRange';
import { flatten } from 'ramda';

class SearchFilters extends React.Component{
	
	static contextTypes = {
		config: React.PropTypes.object
	};

	static propTypes = {
		facets: React.PropTypes.array.isRequired,
		selected: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func
	};

	getFacetsToDisplay = (selected) => {

		var {
			facetsToDisplay
		} = this.context.config;

		var selections = flatten(selected.map( item => item.selected))

		var names = [],
			defaultNames = facetsToDisplay['*'],
			hasKey = false;
		
		/* Loop through selections and find Facets to display */

		selections.forEach( (item) => {			
			if(facetsToDisplay.hasOwnProperty(item)){
				names = facetsToDisplay[item]
				hasKey = true;
			}
		});

		/* If there are no keys in `facetsToDisplay` Return all facets */

		if(!hasKey) return defaultNames

		/* Found */
	
		return names;
	};

	shouldComponentUpdate( nextProps ){
		
		return this.props.facets != nextProps.facets || this.props.selected != nextProps.selected
	}
	
	render(){

		var {
			facets,
			dispatch,
			selected
		} = this.props;
		
		/* Facet names to display */

		var facetsToDisplay = this.getFacetsToDisplay(selected);

		/* Exclude tabs and agree with `facetsToDisplay` */

		facets = facets.filter( facet => !facet.tab && facetsToDisplay.indexOf(facet.name) != -1);		

		return (
			<div>
				{facets.map( (facet, index) => {

					/* Recalculate Selected values */

					var selectedFacets = selected
								.filter( (item) => item.name == facet.name)
								.map( (item) => item.selected),
						selectedItems = flatten(selectedFacets);

					var passProps = {
						facet, 
						dispatch,
						selected: selectedItems,
						key: index,
					};

					switch(facet.type){

						case 'checkbox':
							return <FacetCheckbox {...passProps} />

						case 'range':
							return <Range {...passProps} />

						case 'rating':
							return <Rating {...passProps} />

						case 'boolean':
							return <FacetBoolean {...passProps} />

						case 'daterange':
							return <DateRange {...passProps} />

						default:
							return <Default {...passProps} />
					}

				})}
			</div>
		)
	}
}

module.exports = SearchFilters