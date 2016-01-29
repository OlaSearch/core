import React from 'react';
import { getValuesFromSelect } from './../../../utilities';

export default class Select extends React.Component{

	onChange = (event) => {

		var values = getValuesFromSelect(event.target);

		this.props.handleChange.call(this, values);

	};

	render(){

		var {
			item, 
			handleChange
		} = this.props;
		
		var {
			defaultValue,
			values
		} = item;

		if(!values) return null;

		return (
			<select 
				ref = 'select'
				onChange = {this.onChange}
				defaultValue = {defaultValue}
				>
				<option value="">Please select</option>
					{values.map( (value, idx) => {
						return <option key = {idx} value = {value.name}>{value.name}</option>
					})}
			 </select>
		)
	}
}