import React from 'react';
import { removeFacet, executeSearch, clearQueryTerm } from './../actions/Search';
import Tag from './Misc/Tag';
import Tooltip from './Guide/Tooltip';
import qs from 'query-string';

class SelectedFilters extends React.Component{
	
	constructor(props){
		super(props)

		/* Parse queryString to get the referrer */
		
		var qString = qs.parse(location.search);
		
		this.state = {
			showGuidePopover: !!qString.referrer
		}
	}

	static propTypes: {
		facets: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func,
		q: React.PropTypes.string,
		showQuery: React.PropTypes.boolean
	};

	static defaultProps = {
		showQuery: false
	};

	handleRemoveFacat(facet, value){

		this.props.dispatch(removeFacet( facet, value ))

		this.props.dispatch(executeSearch())

	};

	closeGuidePopover = () => {

		this.setState({
			showGuidePopover: false
		})
	};

	render(){

		var {
			facets,
			showQuery,
			q,
			dispatch
		} = this.props;		

		var {
			showGuidePopover
		} = this.state;		

		return (
			<div className="ola-facet-tags">				
				
				<Tooltip 
					isShown = {showGuidePopover} 
					onClose = {this.closeGuidePopover} 
				/>

				{showQuery && q
					? <div className="ola-facet-tag">
						<span className="ola-facet-tag-name">{q}</span>
						<button className="ola-facet-tag-remove" onClick = { () => {

							dispatch( clearQueryTerm() )
							dispatch( executeSearch() )
						}}></button>
					</div>
					: null
				}

				{facets.map( (facet, idx) => {

					var { selected : tags, type, label } = facet;					
					
					return (
						<div key = {idx} className="ola-facet-tags-group">
							
							<span className="ola-facet-tags-heading">{facet.displayName}: </span>

							{tags.map( (value, index) => {

								var removeFacet = this.handleRemoveFacat.bind(this, facet, value)

								return (
									<Tag 
										key = {index}
										onRemove = {removeFacet} 
										name = {value}
										facet = { facet }
									/>
								)
							})}
						</div>
					)
				})}
			</div>
		)
	}
}


module.exports = SelectedFilters