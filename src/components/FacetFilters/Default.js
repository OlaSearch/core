import React from 'react';
import { addFacet, removeFacet, executeSearch } from './../../actions/Search';
import Tag from './../Misc/Tag';
import ReactList from 'react-list';
import { FacetToggle } from './../../decorators/OlaFacetToggle';
import classNames from 'classnames';

class Default extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			filterText: '',
			showMore: false
		}
	}

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        selected: React.PropTypes.array.isRequired,
        facet: React.PropTypes.object.isRequired,
        limit: React.PropTypes.number.isRequired,
    };

    static defaultProps = {
		limit: 5,
		showMoreText: 'Show more',
		showLessText: 'Show fewer',
	};


	handleAddFacet = (facet, value) => {

		this.setState({
			filterText: ''
		});

		this.props.dispatch(addFacet(facet, value))

		this.props.dispatch(executeSearch())

	};
	
	handleRemoveFacat = (facet, value) => {

		this.props.dispatch(removeFacet( facet, value ))

		this.props.dispatch(executeSearch())

	};

	toggleshowMore = () => {

		this.setState({
			showMore: !this.state.showMore
		})
	};

	onChangeFilterText = (event) => {

		this.setState({
			filterText: event.target.value
		})
	};

	render(){
		
		var {
			filterText,
			showMore,
		} = this.state;

		var {
			facet,
			limit,
			selected,
			isCollapsed,
			toggleDisplay,
			showMoreText,
			showLessText,
		} = this.props;

		var {
			values,
		} = facet;

		/* Lowercase */

		var filter = filterText.toLowerCase();		

		/* Filter values */
		
		values = values
			.filter( (item) => item.name.match( new RegExp(filter, 'i') ))
			.filter( (item) => selected.indexOf(item.name) == -1)

		var size = values.length;

		/* Should display show more link */

		var shouldDisplayShowMore = size > limit;		
		
		/* Show more */

		if(!showMore) values = values.slice(0, limit)		
		
		var showMoreLink = shouldDisplayShowMore 
			? <button className="ola-link-show-more" onClick = {this.toggleshowMore}>{showMore? showLessText : showMoreText}</button> 
			: null;

		var klass = classNames({
			'ola-facet': true,
			'ola-facet-collapsed': isCollapsed
		});
		
		return (
			<div className={klass}>
				<h4 className="ola-facet-title" onClick = {toggleDisplay}>{facet.displayName}</h4>
				<div className="ola-facet-wrapper">
					<input 
						type="text"
						className="ola-text-input ola-facet-filter-input"
						value = {filterText}
						placeholder = "Filter"
						arial-label="Input"
						onChange = {this.onChangeFilterText}
					/>

					<div className="ola-facet-tags-selected">
						{selected.map( (item, idx) => {

							var removeFacet = this.handleRemoveFacat.bind(this, facet, item)

							return <Tag
									onRemove = {removeFacet} 
									name = {item}
									facet = { facet }
									key = {idx}
								/>
						})}
					</div>


					<div className="ola-facet-list">					

						<div className="ola-facet-scroll-list">
							<ReactList
								itemRenderer={ (index, key) => {
									
									var { name, count } = values[index];
									var handleAddFacet = this.handleAddFacet.bind(this, facet, name);
									
									return (
										<button
											className= 'ola-facet-link'
											type = "button"
											key = {key}
											onClick = {handleAddFacet}
										>
											<span className="ola-search-facet-count">{ count }</span>
											<span className="ola-search-facet-name">{ name }</span>											
										</button>
									)
								}}
								length={values.length}
								type='uniform'
							/>
						</div>
						
						{showMoreLink}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = FacetToggle( Default )