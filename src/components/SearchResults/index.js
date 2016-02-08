import React from 'react';
import SnippetDefault from './../Snippets/Default';
import { getMatchingSnippet, generateSlug } from './../../utilities';
import classNames from 'classnames';
import { flatten } from 'ramda';

class SearchResults extends React.Component{

	constructor(props){
		super(props)
	}

	static propTypes = {
		results: React.PropTypes.array.isRequired,
		bookmarks: React.PropTypes.array,
		dispatch: React.PropTypes.func,
		isLoading: React.PropTypes.string,
	};

	static defaultProps = {
		category: []
	};

	static contextTypes = {
		config: React.PropTypes.object
	};

	shouldComponentUpdate( nextProps ){

		return (
			this.props.results != nextProps.results
			|| this.props.bookmarks != nextProps.bookmarks
		)
	}

	render(){
		
		let { results, category, ...props } = this.props;		
		let { snippetRules, defaultSnippet } = this.context.config;		
		
		/* Add category names */
		
		let categories = flatten( category.map( item => item.selected) );
		let klass = classNames('ola-results', categories.map( item => 'ola-section-' + generateSlug(item)));
		
		return (
			<div className={klass}>
				{results.map( (result, idx) => {

					let OlaSnippet = getMatchingSnippet( snippetRules , result ) || defaultSnippet || SnippetDefault
					
					return (
						<OlaSnippet
							result = {result}
							key = {idx}
							{...props}
						/>
					)
					
				})}
			</div>
		)

	}
}


module.exports = SearchResults