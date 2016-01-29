import React from 'react';
import c3 from 'c3';
import { addFacet, replaceFacet, executeSearch } from './../../actions/Search';
import { union, difference } from 'ramda';

export default class PieChart extends React.Component{
	
	static defaultProps = {		
		title: 'Movies by genre',
		type: 'pie'		
	};

	onSelect(facet, value){
		
		var { dispatch, multiple } = this.props;
		
		if(multiple){
			
			dispatch( addFacet(facet, value))
		
		}else{
			
			dispatch( replaceFacet(facet, value))
		}
		
		dispatch( executeSearch() )
	}

	componentDidMount(){

		var {
			type
		} = this.props;

		var data = this.getValues();

		this.chart = c3.generate({
			bindto: this.refs.chart,
			data: {
				columns: data,
				type: type,
				onclick: (d, element) => {
					this.onSelect(this.facetObj, d.name)
				},
			}
		});
	}

	componentWillMount(){
		this.allValues = []
	}

	getValues(prop){

		var props = prop? prop : this.props;
		
		var {			
			facets,
			facetName
		} = props;
		
		/* Pick the facet */

		var facet = facets.filter( (item) => item.name == facetName);
		
		this.facetObj = facet[0];

		if(!this.facetObj) return [];

		var _names = this.facetObj.values.map( (item)=> item.name);
		
		this.allValues = union(_names, this.allValues);
		
		this.excludes = difference(this.allValues, _names)
		
		return this.facetObj.values.map( (item) => [item.name, item.count]);
		
	}

	shouldComponentUpdate(nextProps){
		
		return nextProps.facets != this.props.facets
		
	}

	componentDidUpdate(prevProps){

		var data = this.getValues();

		/**
		 * Set previous data to ZERO
		 */
		
		this.chart.load({
			columns: data,
			unload: this.excludes
		});
	}
	
	render(){
		
		return (
			<div className="ola-viz">
				<h3>{this.props.title}</h3>
				<div ref="chart"></div>
			</div>
		)
	}
}