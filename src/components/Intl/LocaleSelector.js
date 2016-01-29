import React from 'react';
import { setLocale } from './../../actions/Intl';

const LocaleSelector = (props, context) => {

	var { store } = context;
	var { dispatch } = store;
	var activeLocale = store.getState().Intl.locales;

	return (
		<div>
			<select 
				defaultValue = { activeLocale}
				onChange = { (event) => {
					
					/* Change locale */

					dispatch( setLocale(event.target.value))

					/* Also dispatch a search */
					// TODO
				}}
			>
				<option value = "en">EN</option>
				<option value = "zh">CN</option>
			</select>
		</div>
	)
}

LocaleSelector.contextTypes = {
	store: React.PropTypes.object
}

module.exports = LocaleSelector