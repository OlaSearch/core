import React from 'react';
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search';
import { FacetToggle } from './../../decorators/OlaFacetToggle';

class DateRange extends React.Component{
    
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        facet: React.PropTypes.object.isRequired,
        selected: React.PropTypes.array.isRequired
    };

	onChange = (facet, value) => {

		if(typeof value == 'string' || value.length == 1) value = [0, value]
		

		// this.props.dispatch(replaceFacet(facet, value))

		// this.props.dispatch(executeSearch())
	};

	render(){

		var {
			facet,			
			selected
		} = this.props;


		return (
			<div className="ola-facet">
				<h4 className="ola-facet-title">{facet.displayName}</h4>
				<label>
					From
					<input type="date" />
				</label>
				<label>
					To
					<input type="date" />
				</label>
			</div>
		)
	}
}

module.exports = FacetToggle( DateRange )