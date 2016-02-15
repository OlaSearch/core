import React from 'react';
import Year from './Year';
import { createHTMLMarkup } from './../../../utilities';

var Title = ( props ) => {

	var { result, isLink } = props;

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
			{ isLink
				? <a href={url} dangerouslySetInnerHTML = { createHTMLMarkup( title) } />
				: <span dangerouslySetInnerHTML = { createHTMLMarkup( title) } />
			}
			{props.children}
		</h3>
	)
};

Title.defaultProps = {
	isLink: true
}

module.exports = Title;