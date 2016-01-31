/**
 * Usage
 *
 * <Tabs 
 *		facets = {facets} 
 *		dispatch = {dispatch}
 *		selected = {facet_query}
 *	/>
 */
import React from 'react';
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search';
import classNames from 'classnames';
import { getDisplayName } from './../../utilities';

export default class Tabs extends React.Component{

	constructor(props){
		super(props)
	}
	
	static contextTypes = {
		config: React.PropTypes.object
	};

	static propTypes = {
		facets: React.PropTypes.array.isRequired,
		selected: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	handleReplaceFacet = (facet, value) => {

		this.props.dispatch(replaceFacet(facet, value))

		this.props.dispatch(executeSearch())

	};

	handleRemoveFacet = (facet) => {

		this.props.dispatch( removeFacet(facet) )

		this.props.dispatch( executeSearch() )
	};

	getTabsForDisplay = (values) => {

		var {
			tabsToDisplay
		} = this.context.config;

		var tabs = [];

		for(var i = 0; i < tabsToDisplay.length; i++){
			
			var tab = values.filter((item) => item.name == tabsToDisplay[i]);
			
			if(tab.length){
				tabs.push({
					name: tab[0].name,
					count: tab[0].count				
				})
			}else{
				tabs.push({
					name: tabsToDisplay[i],
					count: 0
				})
			}
		}

		return tabs;
	};

	render(){

		var {
			facets,
			selected
		} = this.props;

		var { config } = this.context;

		var facet = facets.filter( (item) => item.tab);

		/* Return null if there is no facets */
		
		if(!facet.length) return null;

		var tab = facet[0];
		var values = [].concat.apply([], facet.map( (item) => item.values))
		
		var tabs = this.getTabsForDisplay(values);

		var selectedFacets = selected
					.filter( (item) => item.name == tab.name)
					.map( (item) => item.selected),
			selectedItems = [].concat.apply([], selectedFacets);


		/* Calculate Total for All Tab */
		
		var totalCount = values.reduce( (acc, obj) => acc + obj.count, 0);
		
		/* Class for all tab */

		var klassTab = classNames({
			'ola-tabs-label': true,
			'ola-tab-active': !selectedFacets.length
		});

		return (
			<nav className="ola-tabs">
				<button 
					className={klassTab}
					onClick = { () => {
						this.handleRemoveFacet(tab)
					}}
				>
					All
					<span className="ola-search-facet-count">{totalCount}</span>
				</button>
				{tabs.map( (value, idx) => {

					var klass = classNames({
						'ola-tabs-label': true,
						'ola-tab-active': selectedItems.indexOf(value.name) != -1
					});

					return (
						<button 
							className = {klass}
							type = 'button'
							key = {idx} 
							onClick = {() => {							
								this.handleReplaceFacet(tab, value.name)
							}}>
							{ getDisplayName(config.facetNames, value.name) }
							<span className="ola-search-facet-count">{value.count}</span>
						</button>
					)
				})}
			</nav>
		)
	}
}