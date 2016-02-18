import React from 'react';
import SnippetDefault from './../Snippets/Default';
import NoResults from './../Snippets/NoResults';
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
		isLoading: React.PropTypes.bool
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
		
		let { results, isLoading, ...rest } = this.props;		
		let { snippetRules, defaultSnippet, noResultsSnippet } = this.context.config;
		let NoResultsSnippet = noResultsSnippet || NoResults;
		
		if(!results.length && !isLoading){
			return <NoResultsSnippet {...this.props} />
		}
		
		return (
			<div className="ola-results">
				{results.map( (result, idx) => {

					let OlaSnippet = getMatchingSnippet( snippetRules , result ) || defaultSnippet || SnippetDefault
					
					return (
						<OlaSnippet
							result = {result}
							key = {idx}
							{...rest}
						/>
					)
					
				})}
			</div>
		)

	}
}


module.exports = SearchResults