import React from 'react';
import { changePerPage, executeSearch } from './../../actions/Search';

const PerPage = ( { perPage, label, dispatch } , context ) => {

	var values = context.config.perPage;

	return (
		<div className="ola-per-page">
			<label>{label}</label>
			<select 
				defaultValue = {perPage}
				onChange = { (event) => {
					
					dispatch( changePerPage(event.target.value))
					
					dispatch( executeSearch())
				}}
				>
				{values.map( (value, idx) => <option key = {idx}>{value}</option> )}
			</select>
		</div>
	)
}

PerPage.contextTypes = {
	config: React.PropTypes.object
}

PerPage.defaultProps = {
	label: 'Results per page',
}

module.exports = PerPage