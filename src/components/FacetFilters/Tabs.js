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
import { removeFacet, replaceFacet, removeAllFacets, executeSearch } from './../../actions/Search';
import classNames from 'classnames';
import { getDisplayName } from './../../utilities';

class Tabs extends React.Component{

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
		resetFacetsOnSelect: React.PropTypes.bool
	};

	static defaultProps = {
		resetFacetsOnSelect: true
	};

	handleReplaceFacet = (facet, value) => {

		/**
		 * Remove facets that are not in this tab
		 */
		
		var { dispatch, resetFacetsOnSelect } = this.props;
		
		if(resetFacetsOnSelect) dispatch( removeAllFacets() )

		dispatch(replaceFacet(facet, value))

		dispatch(executeSearch())

	};

	handleRemoveFacet = (facet) => {

		var { dispatch, resetFacetsOnSelect } = this.props;

		if(resetFacetsOnSelect) dispatch( removeAllFacets() )

		dispatch( removeFacet(facet) )

		dispatch( executeSearch() )
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

		var isAllSelected = !selectedFacets.length;

		var klassTab = classNames({
			'ola-tabs-label': true,
			'ola-tab-active': isAllSelected
		});

		return (
			<nav className="ola-tabs">
				<a 
					className={klassTab}
					onClick = { () => {
						if(!isAllSelected) this.handleRemoveFacet(tab)
					}}
				>
					All
					<span className="ola-search-facet-count">{totalCount}</span>
				</a>
				{tabs.map( (value, idx) => {

					var isActive = selectedItems.indexOf(value.name) != -1;

					var klass = classNames({
						'ola-tabs-label': true,
						'ola-tab-active': isActive
					});

					return (
						<a 
							className = {klass}
							type = 'button'
							key = {idx} 
							onClick = {() => {
								
								if(!isActive && value.count) this.handleReplaceFacet(tab, value.name)

							}}>
							<span className="ola-tab-name">{ getDisplayName(config.facetNames, value.name) }</span>
							<span className="ola-search-facet-count">{value.count}</span>
						</a>
					)
				})}
			</nav>
		)
	}
}

module.exports = Tabs