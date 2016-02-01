/**
Example:
<BarChart 
	facets = {facet}						
	facetName = 'year_i'
	selected = {selected}
	dispatch = {dispatch}
	sampleSize = { 10000 }
	showYAxis = { false }
	showXAxis = { false }
	showLabel = { false }
	showSampleSizeSelector = { false }
	showTooltip = { false }
	sortDirection = 'asc'
	type = 'area'
	barRatio = { 1}
	height = { 100}
	constrainBounds = { false }
	/>
*/

import React from 'react';
// import c3 from 'c3';
import { addFacet, replaceFacet, executeSearch } from './../../actions/Search';

export default class BarChart extends React.Component{
	
	static defaultProps = {
		title: 'Movies by year',
		multiple: false,
		type: 'bar',
		zoom: false,
		sampleSize: 20,
		showXAxis: true,
		showYAxis: true,
		showLabel: true,
		showSampleSizeSelector: true,
		sortDirection: 'desc',
		showTooltip: true,
		barRatio: 0.9,
		height: 320,
		constrainBounds: true,
		duration: 300,
	};

	constructor(props){

		super(props)	
	}
	
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
			type,
			zoom,
			showXAxis,
			showYAxis,
			showLabel,
			barRatio,
			height,
			showTooltip,
			duration,
		} = this.props;

		var data = this.getValues();
		
		this.chart = c3.generate({
			bindto: this.refs.chart,
			data: {
				columns: [ data ],          
				type: type,
				onclick: (d, element) => {
					
					this.onSelect(this.facetObj, this.values[d.index].name)
				},
				color: () => 'orange'				
			},            
			axis : {
				x : {
					tick: {                    
						format: (d) => this.values? this.values[d].name : 'a',
						culling: {
							max: 6
						}
					},
					show: showXAxis,					
				},
				y: {
					show: showYAxis
				}
			},
			legend: {
				show: showLabel
			},
			zoom: {
		        enabled: zoom
		    },
		    bar: {
		    	ratio: barRatio
		    },
		    size: {
		    	height: height
		    },
		    tooltip: {
		    	show: showTooltip
		    },
		    transition: {
				duration: duration
			}
		});
	}

	getValues(props){
		
		var {
			facets,			
			facetName,
			selected,
			sortDirection,
			constrainBounds,
			sampleSize,
		} = this.props;
		
		
		/* Pick the facet */

		var facet = facets.filter( (item) => item.name == facetName);

		var selectedFacet = selected.filter( (item) => item.name == facetName);

		this.facetObj = facet[0]
		
		if(!this.facetObj) return []

		/* Sort values */

		this.values = this.facetObj.values
			.sort( (a, b) => sortDirection == 'desc' ? b.name - a.name : a.name - b.name)

		/* For bounds */

		if(constrainBounds){

			var hasBounds = selectedFacet.length && ['range', 'rating'].indexOf(this.facetObj.type) != -1;
			var bounds = hasBounds? selectedFacet[0].selected[0] : false;

			this.values = this.values
				.filter( (item) => {

					if(	bounds) {

						return typeof bounds == 'object'
						? item.name >= bounds[0] && item.name <= bounds[1] 
						: item.name <= bounds
						
					}

					return true;

				})
				.slice(0, sampleSize)
		}

		var data = this.values.map( (item) => item.count);		

		return [this.facetObj.displayName, ...data];
		
	}

	

	componentDidUpdate(){
		
		var data = this.getValues()

		this.chart.load({
			columns: [
				data
			]
		});
	}


	render(){
		
		var { title } = this.props;
		
		return (
			<div className="ola-viz">
				{ title
					? <h3>{title}</h3>
					: null
				}				
				<div ref="chart"></div>
			</div>
		)
	}
}