import React from 'react';
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search';
import { FacetToggle } from './../../decorators/OlaFacetToggle';

class FacetBoolean extends React.Component{
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        facet: React.PropTypes.object.isRequired,
        selected: React.PropTypes.array.isRequired
    };

	onChange = (facet, event) => {

		var {
			dispatch
		} = this.props;

		if(event.target.checked){
			
			dispatch(replaceFacet(facet, 'true'))

		}else{
			
			dispatch(removeFacet(facet, 'true'))
			
		}

		dispatch(executeSearch())

	};

	render(){

		var {
			facet,			
			selected
		} = this.props;

		if(!facet.values.length) return null;

		var { displayName } = facet;

		return (
			<div className="ola-facet">
				<h4 className="ola-facet-title">{displayName}</h4>
				<label className="ola-checkbox ola-checkbox-label">
					<input 
						type="checkbox"
						checked = {!!selected.length}
						onChange = { (event)=> {

							this.onChange.call(this, facet, event)

						}}
					/>
					{displayName}
				</label>
			</div>
		)
	}
}

export default FacetToggle( FacetBoolean )