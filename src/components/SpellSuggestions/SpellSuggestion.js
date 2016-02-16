import React from 'react';
import { updateQueryTerm, executeSearch } from './../../actions/Search';

class SpellSuggestion extends React.Component{
	
	constructor(props){
		super(props)
	}
	
	static propTypes = {
		suggestions: React.PropTypes.array.isRequired,
		totalResults: React.PropTypes.number.isRequired,
		dispatch: React.PropTypes.func.isRequired
	};

	onChange = (term) => {

		var { dispatch } = this.props;

		dispatch( updateQueryTerm(term) );

		dispatch( executeSearch() );
	};

	render(){

		var {
			suggestions,
			onChange,
			totalResults,
		} = this.props;

		if(!suggestions.length) return null;

		var max = suggestions.reduce( (a, b) => a.count > b.count? a: b);

		/* Check if Current results is less than the suggestions */

		if(totalResults >= max.count) return null;

		return (
			<div className="ola-spell-suggestion">
				<span>Did you mean</span>
				{suggestions.map( (item, idx) => {

						return (
							<button
								type="button"
								className="ola-btn ola-spell-links"
								key = {idx}
								onClick = {() => {
									onChange? onChange(item.term) : this.onChange(item.term)
								}}
							>
								<span className="ola-spell-term">{item.term}</span>
								<span className="ola-spell-count">{item.count}</span>
							</button> 
						)
						
					}
				)}
			</div>
		)
	}
}

module.exports = SpellSuggestion