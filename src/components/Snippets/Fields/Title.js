import React from 'react';
import Year from './Year';
import { createHTMLMarkup } from './../../../utilities';

var Title = ( { result }) => {

	var {
		year,
		title,
		url,
		highlighting,
	} = result;
	
	/* Check for highlighting */

	if(highlighting){

		var { title: highlighted_title } = highlighting;
		
		if(typeof highlighted_title == 'object') {
			title = highlighted_title[0];
		}
	}

	return (
		<h3 className="ola-field ola-field-title">
			<a href={url} dangerouslySetInnerHTML = { createHTMLMarkup( title) } />
			<Year year = {year} />
		</h3>
	)
};

module.exports = Title;