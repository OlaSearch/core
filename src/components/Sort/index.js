import React from 'react';
import { changeSort, executeSearch } from './../../actions/Search'

const Sort = (props, context) => {
  
	let { sortBy } = context.config;

	let { dispatch, selected } = props;

	return (
		<div className="ola-sort">
			<label>Sort by </label>
			<select
				value = {selected}
				onChange = { (event) => {
					
					dispatch( changeSort(event.target.value) )

					dispatch( executeSearch() )
				}}
				>
				<option value="">Relevance</option>
				{sortBy.map((sort, idx) => <option key = {idx} value = {sort.value}>{sort.name}</option> )}
			</select>
		</div>
	)
};

Sort.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string.isRequired
}

Sort.contextTypes = {
	config: React.PropTypes.object
}

module.exports = Sort;